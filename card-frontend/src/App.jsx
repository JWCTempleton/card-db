import { useState } from "react";
import "./App.css";

function App({ cards }) {
  console.log("cards are", cards);
  return (
    <div className="App">
      <div>
        {cards.map((card) => {
          return (
            <div>
              <p>{card.id}</p>
              <p>{card.company}</p>
              <p>{card.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
