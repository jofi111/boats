import React from "react";

function Form() {
  return (
    <div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" />
      </div>
      <div>
        <label htmlFor="model">Model</label>
        <input type="text" name="model" />
      </div>
      <div>
        <label htmlFor="reg">Register</label>
        <input type="text" name="reg" />
      </div>
      <div>
        <label htmlFor="hours">Hours</label>
        <input type="number" name="hours" />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input type="number" name="year" />
      </div>
      <div>
        <button>Add data</button>
      </div>
    </div>
  );
}

export default Form;
