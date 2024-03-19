import { useState } from "react";
import "./App.css";
import rawData from "./rawData.json";
import BoatTable from "./components/BoatTable/BoatTable";
import Form from "./components/BoatTable/Form/Form";

function App() {
  const [boats, setBoats] = useState(rawData.boats);
  return (
    <div className="container">
      <BoatTable data={boats} />
      <p>Form for adding the boat</p>
      <Form />
    </div>
  );
}

export default App;
