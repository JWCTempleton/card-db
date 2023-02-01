const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

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

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

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

const generateId = () => {
  const maxId = cards.length > 0 ? Math.max(...cards.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/cards", (request, response) => {
  if (!body.company || !body.description) {
    return response.status(400).json({
      error: "company or description missing",
    });
  }
  const card = {
    id: generateId(),
    submitted: new Date(),
    company: body.company,
    description: body.description,
    notes: body.notes || null,
    service: body.service,
    status: body.status,
  };

  cards = cards.concat(card);
  response.json(card);
});

app.delete("/api/cards/:id", (request, response) => {
  const id = Number(request.params.id);
  cards = cards.filter((card) => card.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
