require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Card = require("./models/card");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// let cards = [
//   {
//     id: 1,
//     company: "Topps",
//     description: "Curry rookie Card",
//     notes: "Autographed",
//     service: "Super Express",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     company: "Fleer",
//     description: "Durant rookie Card",
//     notes: null,
//     service: "Express",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     company: "Panini",
//     description: "Doncic rookie Card",
//     notes: "Autographed",
//     service: "Walk Through",
//     status: "Pending",
//   },
//   {
//     company: "Topps",
//     description: "LeBron Card",
//     notes: null,
//     service: "Walk-through",
//     status: "Pending",
//     id: 4,
//   },
// ];

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
  Card.find({}).then((cards) => {
    response.json(cards);
  });
});

app.get("/api/cards/:id", (request, response) => {
  Card.findById(request.params.id)
    .then((card) => {
      if (card) {
        response.json(card);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

// const generateId = () => {
//   const maxId = cards.length > 0 ? Math.max(...cards.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/cards", (request, response) => {
  const body = request.body;
  if (!body.company || !body.description) {
    return response.status(400).json({
      error: "company or description missing",
    });
  }
  const card = new Card({
    submitted: new Date(),
    company: body.company,
    description: body.description,
    notes: body.notes || null,
    service: body.service,
    status: body.status,
  });

  card.save().then((savedCard) => {
    response.json(savedCard);
  });
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
