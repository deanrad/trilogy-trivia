const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const findOrCreate = require("mongoose-findorcreate");

const GHProfile = new Schema({}, { strict: false });

const schema = new Schema({
  githubId: { type: String },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  accessToken: { type: String },
  githubProfile: { type: GHProfile, required: false }
});
schema.plugin(findOrCreate);

const Student = mongoose.model("Student", schema);

module.exports = Student;
