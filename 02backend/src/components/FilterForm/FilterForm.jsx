import React, { useEffect, useState } from "react";

function FilterForm({ data, handleFilterData }) {
  const [brands, setBrands] = useState([]); //nastaveni prazdneho pole s useEffect, aby se pole aktualizovalo vzdy kdyz se zmeni data
  const [selBrands, setSelBrands] = useState([]); //selected brands, defaultne neni nic oznacene
  const [selReg, setSelReg] = useState("");
  const [criteria, setCriteria] = useState("brand");
  useEffect(() => {
    setBrands(Array.from(new Set(data.map((boat) => boat.brand)))); // nejrychlejsi zpusob jak vytvorit unikatnost: ze znacek je vytvoreno pole (data.map...), pro unikatnost (aby se neopakovaly) znacek je z nich vytvorena kolekce (Set), z kolekce je pak vytvoreno znovu pole (Array.from)
  }, [data]);

  const handleChange = (e) => {
    const { value, selectedOptions, name } = e.target;
    switch (name) {
      case "brand": {
        const tempBrands = Array.from(selectedOptions).map(
          (option) => option.value
        );
        setSelBrands(tempBrands);
        break;
      }
      case "reg": {
        setSelReg(value.trim());
      }
      default:
        break;
    }
  };

  //   useEffect(() => {
  //     console.log(selBrands);
  //   }, [selBrands]);

  const handleFilter = () => {
    let filtered;
    switch (criteria) {
      case "brand": {
        filtered = data.filter((boat) => selBrands.includes(boat.brand));

        break;
      }
      case "reg": {
        filtered = data.filter((boat) => boat.reg === selReg);
        break;
      }
      default:
        break;
    }
    handleFilterData(filtered);
  };

  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleReset = () => {
    handleFilterData(data);
    setSelBrands([]);
    setSelReg("");
  };

  return (
    <fieldset>
      <legend>Boats filter</legend>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="brand-criteria"
          value="brand"
          checked={criteria === "brand"}
          onChange={handleCriteria}
        />
        <label htmlFor="brand-criteria">searching boats brands</label>
      </div>
      <div>
        <input
          type="radio"
          name="filter-criteria"
          id="reg-criteria"
          value="reg"
          checked={criteria === "reg"}
          onChange={handleCriteria}
        />
        <label htmlFor="reg-criteria">searching boats registers</label>
      </div>
      <div>
        <select
          disabled={criteria === "reg"}
          name="brand"
          id="brand"
          multiple
          value={selBrands}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <option key={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div>
        <input
          disabled={criteria === "brand"}
          type="text"
          id="reg"
          name="reg"
          value={selReg}
          onChange={handleChange}
        />
      </div>
      <div>
        <button onClick={handleFilter}>Filter boats</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </fieldset>
  );
}

export default FilterForm;
