import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import cardService from "./services/cards";

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
  const [cardData, setCardData] = useState([]);
  const [newCard, setNewCard] = useState({
    company: "",
    description: "",
    notes: "",
    service: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    cardService.getAll().then((response) => {
      setCardData(response);
    });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
  };

  const addNewCard = (event) => {
    event.preventDefault();
    const newCardObject = {
      company: newCard.company,
      description: newCard.description,
      notes: newCard.notes || null,
      service: newCard.service,
      status: "Pending",
    };

    cardService.create(newCardObject).then((response) => {
      setCardData(cardData.concat(response));
    });
    setNewCard({
      company: "",
      description: "",
      notes: "",
      service: "",
    });
  };

  const handleNewCard = (event) => {
    const { name, value } = event.target;
    setNewCard((prevCard) => {
      return { ...prevCard, [name]: value };
    });
  };

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
          <option>--Select a service--</option>
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
