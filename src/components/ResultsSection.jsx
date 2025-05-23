export default function ResultsSection({ coordinates }) {
  const { lat, lng, confidence } = coordinates;
  if (lat === '--') return null;

  return (
    <div className="results-section">
      <h2 className="section-title">📍 Location Results</h2>
      <div className="coordinates-display">
        <div className="coordinate-card">
          <div className="coordinate-label">Latitude</div>
          <div className="coordinate-value">{lat}</div>
        </div>
        <div className="coordinate-card">
          <div className="coordinate-label">Longitude</div>
          <div className="coordinate-value">{lng}</div>
        </div>
        <div className="coordinate-card">
          <div className="coordinate-label">Confidence</div>
          <div className="coordinate-value">{confidence}</div>
        </div>
      </div>
      <div className="map-placeholder">
        📍 Interactive map will display here
        <br />
        <small>Showing detected location on campus</small>
      </div>
    </div>
  );
}
