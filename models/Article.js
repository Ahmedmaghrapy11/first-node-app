const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create collection structure / schema
const articleSchema = new Schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});

// create model with the name and schema
const Article = mongoose.model("Article", articleSchema);

// export model
module.exports = Article;
