import React, { createContext, JSX } from "react";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";

import useCurrencies from "../hooks/useCurrencies";
import { TCurrency } from "../data";

type TCurrenciesContext = {
  currencies: TCurrency[];
  visible: TCurrency[];
  toggle: (id: number) => void;
};

export const CurrenciesContext = createContext<TCurrenciesContext>({
  visible: [],
  currencies: [],
  toggle: () => {},
});

type Props = {
  children: JSX.Element[];
};

function Currencies({ children }: Props) {
  const { visible, currencies, toggle } = useCurrencies();

  return (
    <CurrenciesContext.Provider
      value={{
        currencies,
        visible,
        toggle,
      }}
    >
      {children}
    </CurrenciesContext.Provider>
  );
}

Currencies.Table = Table;
Currencies.Dropdown = Dropdown;

export default Currencies;
