const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Card = require("../models/card");

const initialCards = [
  {
    company: "Panini",
    description: "Curry Rookie Card",
    notes: "Autographed",
    service: "Walk-Through",
    submitted: new Date(),
    status: "Pending",
  },
  {
    company: "Topps",
    description: "Durant Rookie Card",
    notes: null,
    service: "Super-Express",
    submitted: new Date(),
    status: "Pending",
  },
];

beforeEach(async () => {
  await Card.deleteMany({});
  let cardObject = new Card(initialCards[0]);
  await cardObject.save();
  cardObject = new Card(initialCards[1]);
  await cardObject.save();
});

test("cards are returned as json", async () => {
  await api
    .get("/api/cards")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all Cards returned", async () => {
  const response = await api.get("/api/cards");

  expect(response.body).toHaveLength(initialCards.length);
});

test("a specific card is contained in the returned cards", async () => {
  const response = await api.get("/api/cards");

  const contents = response.body.map((card) => card.description);
  expect(contents).toContain("Curry Rookie Card");
});

afterAll(async () => {
  await mongoose.connection.close();
});
