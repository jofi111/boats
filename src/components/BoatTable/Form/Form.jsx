import React from "react";

function Form({ data }) {
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
  };

  return (
    <div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          value={data.brand}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="model">Model</label>
        <input
          type="text"
          name="model"
          value={data.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="reg">Register</label>
        <input
          type="text"
          name="reg"
          value={data.reg}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="hours">Hours</label>
        <input
          type="number"
          name="hours"
          value={data.hours}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          name="year"
          value={data.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <button>Add data</button>
      </div>
    </div>
  );
}

export default Form;
