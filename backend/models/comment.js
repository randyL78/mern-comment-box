const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a new instance of mongoose schema. describes shape of db entries
const CommentsSchema = new Schema({
    author: String,
    text: String
  },
  {
    timestamps: true
  });

module.exports = mongoose.model("Comment", CommentsSchema);
