import { useEffect, useState } from "react";
import "./App.css";
import rawData from "./rawData.json";
import BoatTable from "./components/BoatTable/BoatTable";
import Form from "./components/Form/Form";
import FilterForm from "./components/FilterForm/FilterForm";
import axios from "axios";

function App() {
  //const [boats, setBoats] = useState(rawData.boats);
  const [boats, setBoats] = useState([]); //defaultni hodnotou je nastavene prazdne pole
  const [newBoat, setNewBoat] = useState({
    id: boats.length > 0 ? Math.max(...boats.map((boat) => boat.id)) + 1 : 1,
    brand: "",
    model: "",
    reg: "",
    hours: "",
    year: "",
  });

  const [boatToEdit, setBoatToEdit] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    hours: "",
    year: "",
  });

  //const [boatsToShow, setBoatsToShow] = useState(rawData.boats);
  const [boatsToShow, setBoatsToShow] = useState([]); //defaultni hodnotou je nastavene prazdne pole

  //GET data
  const getBoats = () => {
    axios.get("http://localhost:3000/?action=getAll").then((response) => {
      setBoats(response.data);
      setBoatsToShow(response.data);
    });
  };
  useEffect(() => {
    getBoats();
  }, []);

  const handleNewData = (updatedBoat, source) => {
    switch (source) {
      case "add-boat-form": {
        setNewBoat(updatedBoat);
        break;
      }
      case "edit-boat-form": {
        setBoatToEdit(updatedBoat);
        break;
      }
      default:
        break;
    }
  };

  const inputsCheck = (boat) => {
    const inputBoat = {
      ...boat,
      brand: boat.brand.trim() ? boat.brand : "empty",
      model: boat.model.trim() ? boat.model : "empty",
      reg: boat.reg.trim() ? boat.reg : "empty",
      hours: parseInt(boat.hours) || 0,
      year: parseInt(boat.year) || 0,
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

  const handleUpdate = (source) => {
    let temp;
    switch (source) {
      case "add-boat-form": {
        temp = inputsCheck(newBoat);
        if (confirmBoat(temp)) {
          const boatsToUpdate = [...boats];
          boatsToUpdate.push(temp);
          setBoats(boatsToUpdate);
          setBoatsToShow(boatsToUpdate);
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
        break;
      }
      case "edit-boat-form": {
        temp = inputsCheck(boatToEdit);
        if (confirmBoat(temp)) {
          const index = boats.findIndex((boat) => boat.id === temp.id);
          if (index !== -1) {
            const boatsToUpdate = [...boats];
            boatsToUpdate[index] = temp;
            setBoats(boatsToUpdate);
            setBoatsToShow(boatsToUpdate);
            setBoatToEdit({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              hours: "",
              year: "",
            });
            alert("Boat data edited");
          } else {
            alert("Boat with this ID wasn't found");
            setBoatToEdit({
              id: 0,
              brand: "",
              model: "",
              reg: "",
              hours: "",
              year: "",
            });
          }
        } else {
          alert("Editing canceled");
        }
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = (idToDel) => {
    const temp = boats.filter((boat) => boat.id !== idToDel);
    setBoats(temp);
    setBoatsToShow(temp);
  };

  const handleEdit = (idToEdit) => {
    const temp = boats.filter((boat) => boat.id === idToEdit);
    setBoatToEdit(...temp);
  };

  // useEffect(() => {
  //   console.log(boatToEdit);
  // }, [boatToEdit]);

  // useEffect(() => {
  //   console.log(boats);
  // }, [boats]);

  const handleFilterData = (filteredBoats) => {
    setBoatsToShow(filteredBoats);
  };

  return (
    <div className="container">
      <FilterForm data={boats} handleFilterData={handleFilterData} />
      <BoatTable
        data={boatsToShow}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <p>Form for adding the boat</p>
      <Form
        id="add-boat-form"
        data={newBoat}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
      <p>Edit the boat</p>
      <Form
        id="edit-boat-form"
        data={boatToEdit}
        handleNewData={handleNewData}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
