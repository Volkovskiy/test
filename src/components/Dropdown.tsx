import React, { useContext, useState } from "react";
import { CurrenciesContext } from "../context/Currency";

import * as icons from "../icons";

function Dropdown() {
  const { currencies, toggle: toggleCurrency } = useContext(CurrenciesContext);

  const [dropdownIsOpened, toggleDropdown] = useState(false);
  const handleDropdownClick = () => {
    toggleDropdown((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      <button onClick={handleDropdownClick}>
        Filter Currencies {dropdownIsOpened ? icons.UP_ICON : icons.DOWN_ICON}
      </button>

      {dropdownIsOpened && (
        <ul>
          {currencies.map((currency) => (
            <li
              key={currency.id}
              onClick={() => {
                toggleCurrency(currency.id);
              }}
            >
              {currency.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
