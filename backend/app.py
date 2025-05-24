from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded'}), 400

    file = request.files['image']
    try:
        image = Image.open(file.stream)
        coordinates = {
            'lat': '42.4242° N',
            'lng': '42.4242° E',
            'Angle': '99°',
        }
        #DUMMY Cordinates

        return jsonify(coordinates)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
