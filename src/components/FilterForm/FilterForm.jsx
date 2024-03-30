import React, { useEffect, useState } from "react";

function FilterForm({ data }) {
  const [brands, setBrands] = useState([]); //nastaveni prazdneho pole s useEffect, aby se pole aktualizovalo vzdy kdyz se zmeni data

  useEffect(() => {
    data.map((boat) => boat.brand);
  }, [data]);

  return (
    <fieldset>
      <legend>Boat filter</legend>
      <div>
        <select></select>
      </div>
    </fieldset>
  );
}

export default FilterForm;
