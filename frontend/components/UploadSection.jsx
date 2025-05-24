import { useRef } from "react";

export default function UploadSection({ setImageSrc, setShowAnalyze }) {
  const inputRef = useRef();

  function handleFile(file) {
    console.log("UploadSection handleFile called");
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowAnalyze(true);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="upload-section">
      <h2 className="section-title">📷 Upload Photo</h2>
      <div
        className="upload-area"
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📁</div>
        <div className="upload-text">
          Drag and drop your campus photo here
          <br />
          or click to browse
        </div>
        <button className="upload-btn">Choose File</button>
        <input
          type="file"
          ref={inputRef}
          className="file-input"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}
