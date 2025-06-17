export default function PreviewSection({
  imageSrc,
  showAnalyze,
  setLoading,
  loading,
  setCoordinates,
}) {
  async function handleAnalyze() {
    setLoading(true);
    console.log("handleAnalyze called");

    try {
      const imageFile = await fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });
          return file;
        });

      console.log("imageFile", imageFile);

      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/analyze_single", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("data from backend", data);

      setCoordinates({
        lat: data.latitude.toFixed(6),
        lng: data.longitude.toFixed(6),
        Angle: data.angle,
      });

      console.log("coordinates state set to", {
        lat: data.latitude.toFixed(6),
        lng: data.longitude.toFixed(6),
        Angle: data.angle,
      });

    } catch (error) {
      console.error("Error during analysis:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="preview-section">
      <h2 className="section-title">Preview</h2>
      {imageSrc ? (
        <img src={imageSrc} className="image-preview" alt="Preview" />
      ) : (
        <div
          style={{ textAlign: "center", color: "#666", padding: "60px 20px" }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🖼️</div>
          <p>Your image will appear here</p>
        </div>
      )}
      {showAnalyze && (
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading}
        >
          🔍 Analyze Location
        </button>
      )}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Passing Image through Neural Network</p>
        </div>
      )}
    </div>
  );
}
