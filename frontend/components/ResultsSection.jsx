import MapSection from "./MapSection";

export default function ResultsSection({ coordinates }) {
  const { lat, lng, Angle } = coordinates;
  if (lat === '--') return null;

  return (
    <div className="results-section">
      <h2 className="section-title">Location Results</h2>
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
          <div className="coordinate-label">Angle</div>
          <div className="coordinate-value">{Angle}</div>
        </div>
      </div>
      <MapSection lat={parseFloat(lat)} lng={parseFloat(lng)} angle={parseFloat(Angle)} />
    </div>
  );
}
