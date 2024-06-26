import React from "react";
import "./BoatTable.css";

function BoatTable({ data, handleDelete, handleEdit }) {
  if (data.length === 0) {
    return <p>No data here</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Register</th>
          <th>Hours</th>
          <th>Year</th>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.brand}</td>
            <td>{item.model}</td>
            <td>{item.reg}</td>
            <td>{item.hours}</td>
            <td>{item.year}</td>
            <td>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDelete(item.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BoatTable;
