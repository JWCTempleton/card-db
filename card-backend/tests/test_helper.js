const Card = require("../models/card");
const User = require("../models/user");

const initialCards = [
  {
    company: "Panini",
    description: "Curry Rookie Card",
    notes: "Autographed",
    service: "Walk-Through",
    submitted: new Date().toISOString(),
    status: "Pending",
  },
  {
    company: "Topps",
    description: "Durant Rookie Card",
    notes: null,
    service: "Super-Express",
    submitted: new Date().toISOString(),
    status: "Pending",
  },
];

const nonExistingId = async () => {
  const card = new Card({
    company: "Panini",
    description: "Test Rookie Card",
    notes: "Autographed",
    service: "Walk-Through",
    submitted: Date(),
    status: "Pending",
  });

  await card.save();
  await card.remove();

  return card._id.toString();
};

const cardsInDb = async () => {
  const cards = await Card.find({});

  return cards.map((card) => card.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialCards,
  nonExistingId,
  cardsInDb,
  usersInDb,
};
