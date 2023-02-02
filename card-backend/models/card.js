const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const cardSchema = new mongoose.Schema({
  company: {
    type: String,
    minLength: 3,
    required: true,
  },
  description: {
    type: String,
    minLength: 3,
    required: true,
  },
  notes: String || null,
  service: String,
  submitted: Date,
  status: String,
});

cardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Card", cardSchema);
