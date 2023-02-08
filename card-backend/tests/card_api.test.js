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

test("A card without a description is not added", async () => {
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

test("A specific card can be viewed", async () => {
  const cardsAtStart = await helper.cardsInDb();

  const cardToView = cardsAtStart[0];

  const resultCard = await api
    .get(`/api/cards/${cardToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultCard.body).toEqual(cardToView);
});

test("A card can be deleted", async () => {
  const cardsAtStart = await helper.cardsInDb();
  const cardToDelete = cardsAtStart[0];

  await api.delete(`/api/cards/${cardToDelete.id}`).expect(204);

  const cardsAtEnd = await helper.cardsInDb();

  expect(cardsAtEnd).toHaveLength(helper.initialCards.length - 1);

  const descriptions = cardsAtEnd.map((card) => card.description);

  expect(descriptions).not.toContain(cardToDelete.description);
});

afterAll(async () => {
  await mongoose.connection.close();
});
