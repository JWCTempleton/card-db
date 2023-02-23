import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import cardService from "./services/cards";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

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
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    cardService.getAll().then((response) => {
      setCardData(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedCardappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      cardService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedCardappUser", JSON.stringify(user));
      cardService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
    }
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

  const handleLogOut = () => {
    console.log("Logging Out");
    window.localStorage.removeItem("loggedCardappUser");
    setUser(null);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log In</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  const cardForm = () => (
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
  );

  return (
    <div className="App">
      {!user && loginForm()}
      {user && (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
          {cardForm()}
        </div>
      )}
      <div>
        {cardData.map((card) => {
          return <Card card={card} key={card.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
