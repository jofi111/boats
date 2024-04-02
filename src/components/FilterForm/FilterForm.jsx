import React, { useEffect, useState } from "react";

function FilterForm({ data }) {
  const [brands, setBrands] = useState([]); //nastaveni prazdneho pole s useEffect, aby se pole aktualizovalo vzdy kdyz se zmeni data
  const [selBrands, setSelBrands] = useState([]); //selected brands, defaultne neni nic oznacene
  useEffect(() => {
    setBrands(Array.from(new Set(data.map((boat) => boat.brand)))); // nejrychlejsi zpusob jak vytvorit unikatnost: ze znacek je vytvoreno pole (data.map...), pro unikatnost (aby se neopakovaly) znacek je z nich vytvorena kolekce (Set), z kolekce je pak vytvoreno znovu pole (Array.from)
  }, [data]);

  const handleChange = (e) => {
    const { value, selectedOptions } = e.target;
    const tempBrands = Array.from(selectedOptions).map(
      (option) => option.value
    );
    setSelBrands(tempBrands);
  };

  useEffect(() => {
    console.log(selBrands);
  }, [selBrands]);

  return (
    <fieldset>
      <legend>Boat filter</legend>
      <div>
        <select
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
    </fieldset>
  );
}

export default FilterForm;
