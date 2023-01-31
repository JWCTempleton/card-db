import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App({ cards }) {
  const [cardData, setCardData] = useState(cards);
  return (
    <div className="App">
      <div>
        {cardData.map((card) => {
          return <Card card={card} />;
        })}
      </div>
    </div>
  );
}

export default App;
