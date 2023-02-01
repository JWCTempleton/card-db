const express = require("express");
const app = express();

app.use(express.json());

let cards = [
  {
    id: 1,
    company: "Topps",
    description: "Curry rookie Card",
    notes: "Autographed",
    service: "Super Express",
    status: "Pending",
  },
  {
    id: 2,
    company: "Fleer",
    description: "Durant rookie Card",
    notes: null,
    service: "Express",
    status: "Pending",
  },
  {
    id: 3,
    company: "Panini",
    description: "Doncic rookie Card",
    notes: "Autographed",
    service: "Walk Through",
    status: "Pending",
  },
  {
    company: "Topps",
    description: "LeBron Card",
    notes: null,
    service: "Walk-through",
    status: "Pending",
    id: 4,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello Server</h1>");
});

app.get("/api/cards", (request, response) => {
  response.json(cards);
});

app.get("/api/cards/:id", (request, response) => {
  const id = Number(request.params.id);
  const card = cards.find((card) => card.id === id);
  if (card) {
    response.json(card);
  } else {
    response.status(404).end();
  }
});

app.post("/api/cards", (request, response) => {
  const card = request.body;
  console.log(card);
  response.json(card);
});

app.delete("/api/cards/:id", (request, response) => {
  const id = Number(request.params.id);
  cards = cards.filter((card) => card.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
