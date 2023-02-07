const cardsRouter = require("express").Router();
const Card = require("../models/card");

cardsRouter.get("/", async (request, response) => {
  const cards = await Card.find({});
  response.json(cards);
});

cardsRouter.get("/:id", (request, response, next) => {
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

cardsRouter.post("/", (request, response, next) => {
  const body = request.body;
  //no longer required
  // if (!body.company || !body.description) {
  //   return response.status(400).json({
  //     error: "company or description missing",
  //   });
  // }
  const card = new Card({
    submitted: new Date(),
    company: body.company,
    description: body.description,
    notes: body.notes || null,
    service: body.service,
    status: body.status,
  });

  card
    .save()
    .then((savedCard) => {
      response.status(201).json(savedCard);
    })
    .catch((error) => next(error));
});

cardsRouter.delete("/:id", (request, response) => {
  Card.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = cardsRouter;
