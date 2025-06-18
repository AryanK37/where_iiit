import io
import json
from pathlib import Path

import numpy as np
import torch
import torch.nn as nn
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from PIL import Image
from torchvision import models, transforms

MODEL_PATH = Path("latlong_model.pth")
MEANS_PATH = Path("train_means.npy")
STDS_PATH = Path("train_stds.npy")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("STARTED")
if not MEANS_PATH.exists() or not STDS_PATH.exists():
    raise FileNotFoundError(f"Normalization files not found at {MEANS_PATH} / {STDS_PATH}")
train_means = np.load(str(MEANS_PATH))
train_stds = np.load(str(STDS_PATH))

class LatLongPredictor(nn.Module):
    def __init__(
        self,
        out_dim: int = 2,
        hidden_dim: int = 512,
        dropout_p: float = 0.1,
        num_regions: int = 15,
        weights=None,
    ):
        super().__init__()
        self.out_dim = out_dim
        backbone = models.efficientnet_v2_s(weights=weights)
        backbone.classifier = nn.Sequential(
            nn.Dropout(dropout_p),
            nn.Identity(),
        )
        self.backbone = backbone
        self.region_bias = nn.Embedding(num_regions, backbone.classifier[1].in_features if hasattr(backbone.classifier[1], 'in_features') else 1280)
        self.region_scale = nn.Embedding(num_regions, backbone.classifier[1].in_features if hasattr(backbone.classifier[1], 'in_features') else 1280)
        self.fc = nn.Sequential(
            nn.Linear(1280, hidden_dim),
            nn.ReLU(),
            nn.Dropout(dropout_p),
            nn.Linear(hidden_dim, out_dim),
        )
        print("INITIALIATION COMPLETE")

    def forward(self, x: torch.Tensor, r: torch.Tensor) -> torch.Tensor:
        ret = self.backbone(x)
        scale = self.region_scale(r)
        bias = self.region_bias(r)
        print(f"Region scale shape: {scale.shape}, bias shape: {bias.shape}, ret shape: {ret.shape}")
        return self.fc(ret * scale + bias)

DATASET_WEIGHTS = models.EfficientNet_V2_S_Weights.IMAGENET1K_V1
model = LatLongPredictor(weights=DATASET_WEIGHTS).to(device)
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model weights not found at {MODEL_PATH}")
model.load_state_dict(torch.load(str(MODEL_PATH), map_location=device))
model.eval()

DATASET_TRANSFORM = DATASET_WEIGHTS.transforms()

app = Flask(__name__)
CORS(app)
print("FLASK APP INITIALIZED")

@app.route('/analyze_single', methods=['POST'])
def analyze_single():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded under field "image"'}), 400

    file = request.files['image']
    # parse region_id if provided
    region_id = request.form.get('region_id', None)
    try:
        region_id = int(region_id) if region_id is not None else 0
    except ValueError:
        return jsonify({'error': 'region_id must be integer'}), 400

    img_id = request.form.get('id', "0")

    try:
        image = Image.open(file.stream).convert("RGB")
    except Exception as e:
        return jsonify({'error': f'Cannot open image: {e}'}), 400

    try:
        img_tensor = DATASET_TRANSFORM(image).unsqueeze(0).to(device)
    except Exception as e:
        return jsonify({'error': f'Transform error: {e}'}), 500

    r_tensor = torch.tensor([region_id], dtype=torch.long, device=device)

    with torch.no_grad():
        pred = model(img_tensor, r_tensor).cpu().numpy().reshape(-1)

    lat_norm, lng_norm = pred[0], pred[1]
    print(f"stds {train_stds[0]},{train_stds[1]}")
    lat = lat_norm * train_stds[0] + train_means[0]
    lng = lng_norm * train_stds[1] + train_means[1]

    base_lat = 17.226564
    base_lng = 78.205519 # approx min longitude

    scaled_lat = lat + base_lat*1_000_000
    scaled_lng = lng + base_lng*1_000_000
    scaled_lat = scaled_lat / 1_000_000
    scaled_lng = scaled_lng / 1_000_000

    # placeholder angle
    angle = 90

    print(f"Predicted de-normalized coordinates: Latitude={lat}, Longitude={lng}")
    print(f"Scaled coordinates: Scaled Latitude={scaled_lat}, Scaled Longitude={scaled_lng}")
    print(f"Angle: {angle}")
    return jsonify({
        "id": img_id,
        # "latitude": float(lat),
        # "longitude": float(lng),
        "latitude": float(scaled_lat),
        "longitude": float(scaled_lng),
        "scaled_latitude": float(lat),
        "scaled_longitude": float(lng),
        "angle": angle
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
