import React from "react";

import Currencies from "./context/Currency";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Currencies>
        <Currencies.Dropdown />
        <Currencies.Table />
      </Currencies>
    </div>
  );
}

export default App;
