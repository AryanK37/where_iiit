import "./styles/App.css";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import PreviewSection from "./components/PreviewSection";
import ResultsSection from "./components/ResultsSection";
import { useState } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [showAnalyze, setShowAnalyze] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: "--",
    lng: "--",
    Angle: "--",
  });

  return (
    <div className="container">
      <Header />
      <div className="upload-preview-wrapper">
        <UploadSection
          setImageSrc={setImageSrc}
          setShowAnalyze={setShowAnalyze}
        />
        <PreviewSection
          imageSrc={imageSrc}
          showAnalyze={showAnalyze}
          setLoading={setLoading}
          loading={loading}
          setCoordinates={setCoordinates}
        />
      </div>
      <ResultsSection coordinates={coordinates} />
    </div>
  );
}

export default App;
