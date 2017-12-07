const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const findOrCreate = require("mongoose-findorcreate");

let i = Math.random() * 100000;

const LinkSchema = new Schema({
  text: String,
  href: String,
  module: { required: false }
});

const schema = new Schema({
  questionKey: {
    type: String,
    required: true,
    index: true,
    default: () => `Q-${i++}`
  },
  prompt: { type: String, required: true },
  markup: { type: String, required: false },
  choices: { type: [String], required: true },
  answer: { type: String, required: true },
  choiceMarkups: { type: [String], required: false },
  links: [LinkSchema], // Link
  categories: [String],
  createdAt: { type: Date, default: Date.now }
});
schema.plugin(findOrCreate);

const Question = mongoose.model("Question", schema);

module.exports = Question;
