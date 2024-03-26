import React from "react";

function Form({ data, handleNewData, handleUpdate }) {
  const handleChange = (e) => {
    let temp = { ...data };
    const { name, value } = e.target;
    switch (name) {
      case "brand": {
        temp.brand = value;
        break;
      }
      case "model": {
        temp.model = value;
        break;
      }
      case "reg": {
        temp.reg = value;
        break;
      }
      case "hours": {
        temp.hours = parseInt(value) || "";
        break;
      }
      case "year": {
        temp.year = parseInt(value) || "";
        break;
      }
      default:
        break;
    }
    handleNewData(temp);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="brand"
          value={data.brand}
          onChange={handleChange}
        />
        <label htmlFor="brand">Brand</label>
      </div>
      <div>
        <input
          type="text"
          name="model"
          value={data.model}
          onChange={handleChange}
        />
        <label htmlFor="model">Model</label>
      </div>
      <div>
        <input
          type="text"
          name="reg"
          value={data.reg}
          onChange={handleChange}
        />
        <label htmlFor="reg">Register</label>
      </div>
      <div>
        <input
          type="number"
          name="hours"
          value={data.hours}
          onChange={handleChange}
        />
        <label htmlFor="hours">Hours</label>
      </div>
      <div>
        <input
          type="number"
          name="year"
          value={data.year}
          onChange={handleChange}
        />
        <label htmlFor="year">Year</label>
      </div>
      <div>
        <button onClick={handleUpdate}>Add data</button>
      </div>
    </div>
  );
}

export default Form;
