const cardsRouter = require("express").Router();
const Card = require("../models/card");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

cardsRouter.get("/", async (request, response) => {
  const cards = await Card.find({}).populate("user", { username: 1, name: 1 });
  response.json(cards);
});

cardsRouter.get("/:id", async (request, response, next) => {
  try {
    const card = await Card.findById(request.params.id);
    if (card) {
      response.json(card);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

cardsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
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
    user: user._id,
  });
  try {
    const savedCard = await card.save();
    user.cards = user.cards.concat(savedCard._id);
    await user.save();
    response.status(201).json(savedCard);
  } catch (exception) {
    next(exception);
  }
});

cardsRouter.delete("/:id", async (request, response) => {
  try {
    await Card.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = cardsRouter;
