export default function BackgroundAnimation({ className }) {
  return (
    <div className={`background-container absolute ${className}`}>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
    </div>
  );
}
