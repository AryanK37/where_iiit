export default function PreviewSection({ imageSrc, showAnalyze, setLoading, loading, setCoordinates }) {
  function handleAnalyze() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCoordinates({
        lat: '28.7041° N',
        lng: '77.1025° E',
        Angle : '92',
      });
    }, 2000);
  }

  return (
    <div className="preview-section">
      <h2 className="section-title">👀 Preview</h2>
      {imageSrc ? (
        <img src={imageSrc} className="image-preview" alt="Preview" />
      ) : (
        <div style={{ textAlign: 'center', color: '#666', padding: '60px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🖼️</div>
          <p>Your image will appear here</p>
        </div>
      )}
      {showAnalyze && (
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
          🔍 Analyze Location
        </button>
      )}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Analyzing image with neural network...</p>
        </div>
      )}
    </div>
  );
}
