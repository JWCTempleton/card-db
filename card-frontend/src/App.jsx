import { useState } from "react";
import "./App.css";

function App({ cards }) {
  const [cardData, setCardData] = useState(cards);
  return (
    <div className="App">
      <div>
        {cardData.map((card) => {
          return (
            <div key={card.id}>
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
