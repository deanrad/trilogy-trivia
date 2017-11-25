const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const findOrCreate = require("mongoose-findorcreate");

const schema = new Schema({
  githubId: { type: String },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  accessToken: { type: String }
});
schema.plugin(findOrCreate);

const Student = mongoose.model("Student", schema);

module.exports = Student;
