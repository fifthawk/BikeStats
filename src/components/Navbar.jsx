import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/rides">Ride Log</Link>
      <Link to="/segments">Segments</Link>
      <Link to="/goals">Goals</Link>
    </nav>
  );
}

export default Navbar;
