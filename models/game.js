const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({}, { strict: false });

const Game = mongoose.model("Game", schema);

module.exports = Game;
