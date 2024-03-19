import { useState } from "react";
import "./App.css";
import rawData from "./rawData.json";
import BoatTable from "./components/BoatTable/BoatTable";

function App() {
  const [boats, setBoats] = useState(rawData.boats);
  return (
    <div className="container">
      <BoatTable data={boats} />
    </div>
  );
}

export default App;
