import { useEffect, useState } from "react";
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

  const handleNewData = (updatedBoat) => {
    setNewBoat(updatedBoat);
  };

  // useEffect(() => {
  //   console.log(newBoat);
  // }, [newBoat]);

  const handleUpdate = () => {
    const boatsToUpdate = [...boats];
    boatsToUpdate.push(newBoat);
    setBoats(boatsToUpdate);
    setNewBoat({
      id: newBoat.id + 1,
      brand: "",
      model: "",
      reg: "",
      hours: "",
      year: "",
    });
  };

  useEffect(() => {
    console.log(boats);
  }, [boats]);

  return (
    <div className="container">
      <BoatTable data={boats} />
      <p>Form for adding the boat</p>
      <Form
        data={newBoat}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
