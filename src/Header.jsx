import { Link } from "react-router";

export default function Header() {
  return (
    <div className="top-nav">
      <h1 className="head">🚀 Crypto Dash </h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
}
