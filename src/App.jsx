import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RideLog from "./pages/RideLog";
import Segments from "./pages/Segments";
import Goals from "./pages/Goals";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rides" element={<RideLog />} />
        <Route path="/segments" element={<Segments />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </div>
  );
}

export default App;
