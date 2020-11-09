import React from "react";
import "./App.scss";
import { Flats } from "./components/Flats/Flats";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <h1>Тестовое задание</h1>
        <div className="row">
          <Flats />
        </div>
      </div>
    </div>
  );
}

export default App;
