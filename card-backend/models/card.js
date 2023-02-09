const mongoose = require("mongoose");

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

cardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Card", cardSchema);
