export default function Header() {
  return (
    <>
      <div className="header">
        <div className="logo-text">Where IIIT</div>
        <hr className="divider" />
        <p className="subtitle">
          Upload a campus photo and find out where the photo was taken
        </p>
      </div>

      <div className="hero-image">
        <a href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer">
        <img src="/public/iiit.png" alt="IIIT Campus" />
        </a>
      </div>
    </>
  );
}
