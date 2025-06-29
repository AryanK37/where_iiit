# Where IIIT

## Project Overview
This application, “Where IIIT”, allows users to upload a campus photo and determine where it was taken by sending it to a backend neural-network. After uploading, the app passes the image through a neural network and displays a preview and shows the resulting latitude, longitude, and an arrow marker on a map. You can also watch a demo video of the project (`video_demo1.webm`)
## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AryanK37/where_iiit.git
   cd where_iiit
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start the development server**

   ```bash
   npm run dev
   # in another terminal
   cd where_iiit/backend
   python3 app.py 
   ```

   The app will run at `http://localhost:5173/`

## Usage

1. Open the app in your browser.
2. Click or drag-and-drop to upload a campus photo.
3. Once preview appears, click “Analyze Location”.
4. Wait for a forward pass of neural network.
5. After analysis, latitude and longitude appear, and the map centers on that location with a marker.

## File Structure 

```
├── backend
│   ├── app.py
│   ├── latlong_model.pth
│   ├── requirements.txt
│   ├── train_means.npy
│   └── train_stds.npy
├── eslint.config.js
├── frontend
│   ├── App.jsx
│   ├── assets
│   ├── components
│   │   ├── Header.jsx
│   │   ├── MapSection.jsx
│   │   ├── PreviewSection.jsx
│   │   ├── ResultsSection.jsx
│   │   └── UploadSection.jsx
│   ├── index.css
│   ├── main.jsx
│   └── styles
│       └── App.css
├── images
│   ├── 2022113007_1.jpg
│   ├── img_0147.jpeg
│   ├── img_0340.jpeg
│   └── img_3581.jpg
├── index.html
├── node_modules/
├── package.json
├── package-lock.json
├── plot.jpeg
├── public
│   └── iiit.png
├── README.md
├── video_demo1.webm
└── vite.config.js
```
