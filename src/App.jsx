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

  const inputsCheck = (boat) => {
    const inputBoat = {
      ...boat,
      brand: boat.brand.trim() ? boat.brand : "empty",
      model: boat.model.trim() ? boat.model : "empty",
      reg: boat.reg.trim() ? boat.reg : "empty",
      hours: boat.hours.toString().trim() ? parseInt(boat.hours) : 0,
      year: boat.year.toString().trim() ? parseInt(boat.year) : 0,
    };
    return inputBoat;
  };

  const confirmBoat = (boat) => {
    return window.confirm(
      "Do you want to add these data?\n" +
        `Boat brand: ${boat.brand}\n` +
        `Boat model: ${boat.model}\n` +
        `Register: ${boat.reg}\n` +
        `Hours: ${boat.hours}\n` +
        `Year: ${boat.year}\n`
    );
  };

  const handleUpdate = () => {
    let temp = inputsCheck(newBoat);
    if (confirmBoat(temp)) {
      const boatsToUpdate = [...boats];
      boatsToUpdate.push(temp);
      setBoats(boatsToUpdate);
      setNewBoat({
        id: newBoat.id + 1,
        brand: "",
        model: "",
        reg: "",
        hours: "",
        year: "",
      });
      alert("New boat data added.");
    } else {
      alert("New boat data adding cancelled.");
    }
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
