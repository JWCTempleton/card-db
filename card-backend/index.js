const express = require("express");
const app = express();
const cors = require("cors");
const Card = require("./models/card");
const logger = require("./utils/logger");
const config = require("./utils/config");

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

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

app.get("/api/cards/:id", (request, response, next) => {
  Card.findById(request.params.id)
    .then((card) => {
      if (card) {
        response.json(card);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId = cards.length > 0 ? Math.max(...cards.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/cards", (request, response, next) => {
  const body = request.body;
  if (!body.company || !body.description) {
    return response.status(400).json({
      error: "company or description missing",
    });
  }
  const card = new Card({
    submitted: Date(),
    company: body.company,
    description: body.description,
    notes: body.notes || null,
    service: body.service,
    status: body.status,
  });

  card
    .save()
    .then((savedCard) => {
      response.json(savedCard);
    })
    .catch((error) => next(error));
});

app.delete("/api/cards/:id", (request, response) => {
  Card.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
