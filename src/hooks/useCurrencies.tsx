import { useState, useMemo } from "react";

import data from "../data";

type TState = {
  [key: number]: boolean;
};

function useCurrencies() {
  const [state, setState] = useState<TState>(() => {
    return data.reduce((acc, current, i) => {
      acc[current.id] = i < 4;
      return acc;
    }, {} as TState);
  });

  const visible = useMemo(() => {
    return data.filter((currency) => {
      return state[currency.id];
    });
  }, [state]);

  const currencies = data;

  const toggle = (id: number) => {
    setState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return {
    visible,
    currencies,
    toggle,
  };
}

export default useCurrencies;
