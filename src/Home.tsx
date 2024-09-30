import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <h1>beat maker</h1>

      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
