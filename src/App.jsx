import { useState } from "react";
import "./App.css";
import rawData from "./rawData.json";
import BoatTable from "./components/BoatTable/BoatTable";
import Form from "./components/BoatTable/Form/Form";

function App() {
  const [boats, setBoats] = useState(rawData.boats);
  const [newBoat, setNewBoat] = useState({
    id: boats.length > 0 ? Math.max(...boats.map((boat) => boat.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    hours: "",
    year: "",
  });
  return (
    <div className="container">
      <BoatTable data={boats} />
      <p>Form for adding the boat</p>
      <Form data={newBoat} />
    </div>
  );
}

export default App;
