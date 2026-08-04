import { useState, useEffect } from "react";

function Dashboard() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rides")
      .then((response) => response.json())
      .then((data) => setRides(data));
  }, []);
  console.log(rides);
  return (
    <div>
      {rides.map((ride) => (
        <h1 key={ride.ride_id}>{ride.name}</h1>
      ))}
    </div>
  );
}

export default Dashboard;
