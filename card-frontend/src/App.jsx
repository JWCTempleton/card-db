import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

const styles = {
  display: "flex",
  flexDirection: "column",
  width: "25rem",
  margin: "0 auto 4rem auto",
  gap: "2rem",
  border: "1px solid white",
  padding: "2rem",
  borderRadius: "5px",
};

function App({ cards }) {
  const [cardData, setCardData] = useState(cards);
  const [newCard, setNewCard] = useState({
    company: "",
    description: "",
    notes: "",
    service: "",
  });

  const addNewCard = (event) => {
    event.preventDefault();
    const newCardObject = {
      company: newCard.company,
      description: newCard.description,
      notes: newCard.notes,
      service: newCard.service,
      status: "Pending",
      id: cardData.length + 1,
    };
    setCardData(cardData.concat(newCardObject));
  };

  const handleNewCard = (event) => {
    const { name, value } = event.target;
    setNewCard((prevCard) => {
      return { ...prevCard, [name]: value };
    });
  };
  console.log("new card", newCard);

  return (
    <div className="App">
      <form style={styles} onSubmit={addNewCard}>
        <input
          type="text"
          placeholder="Company"
          name="company"
          value={newCard.company}
          onChange={handleNewCard}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={newCard.description}
          onChange={handleNewCard}
        />
        <textarea
          placeholder="Notes"
          name="notes"
          value={newCard.notes}
          onChange={handleNewCard}
        />
        <label htmlFor="service">Service Level</label>
        <select
          id="service"
          value={newCard.service}
          name="service"
          onChange={handleNewCard}
        >
          <option value="Walk-through">Walk Through</option>
          <option value="Super-Express">Super-Express</option>
          <option value="Express">Express</option>
          <option value="Regular">Regular</option>
          <option value="Value">Value</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <div>
        {cardData.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
