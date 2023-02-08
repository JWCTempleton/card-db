const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Card = require("../models/card");

beforeEach(async () => {
  await Card.deleteMany({});
  let cardObject = new Card(helper.initialCards[0]);
  await cardObject.save();
  cardObject = new Card(helper.initialCards[1]);
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

  expect(response.body).toHaveLength(helper.initialCards.length);
});

test("a specific card is contained in the returned cards", async () => {
  const response = await api.get("/api/cards");

  const contents = response.body.map((card) => card.description);
  expect(contents).toContain("Curry Rookie Card");
});

test("A valid card can be added", async () => {
  const newCard = {
    company: "Fleer",
    description: "Doncic Rookie Card",
    notes: "Autographed",
    service: "Express",
    submitted: new Date(),
    status: "Pending",
  };

  await api
    .post("/api/cards")
    .send(newCard)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const cardsAtEnd = await helper.cardsInDb();

  expect(cardsAtEnd).toHaveLength(helper.initialCards.length + 1);

  const descriptions = cardsAtEnd.map((card) => card.description);
  expect(descriptions).toContain("Doncic Rookie Card");
});

test("A car without a description is not added", async () => {
  const newCard = {
    company: "Fleer",
    description: null,
    notes: "Autographed",
    service: "Express",
    submitted: new Date(),
    status: "Pending",
  };

  await api.post("/api/cards").send(newCard).expect(400);

  const cardsAtEnd = await helper.cardsInDb();

  expect(cardsAtEnd).toHaveLength(helper.initialCards.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
