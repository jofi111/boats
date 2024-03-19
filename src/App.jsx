import { useState } from "react";
import "./App.css";
import rawData from "./rawData.json";

function App() {
  const [cars, setCars] = useState(rawData.cars);
  return <div className="container">Ahoy</div>;
}

export default App;
