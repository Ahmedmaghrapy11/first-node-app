// using / importing express module...
const express = require("express");
const mongoose = require("mongoose");
// import model
const Article = require("./models/Article");

// initialize express application...
const app = express();

mongoose
  .connect(
    "mongodb+srv://ahmadmaghrapy11:Ahmaadmaghrapy11**@first-node-mongo-db.eph13fd.mongodb.net/?retryWrites=true&w=majority&appName=first-node-mongo-db"
  )
  .then(() => {
    console.log("Database connected successfully...");
  })
  .catch((error) => {
    console.log("Error with database connection !", error);
  });

// URI => mongodb+srv://ahmadmaghrapy11:Ahmaadmaghrapy11**@first-node-mongo-db.eph13fd.mongodb.net/?retryWrites=true&w=majority&appName=first-node-mongo-db

// accepting json body
app.use(express.json());

// -------------------------- making functions with routes -------------------- //
app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.get("/hi", (req, res) => {
  res.send("you visited hi.");
});

app.get("/test", (req, res) => {
  res.send("you visited test.");
});

app.get("/", (req, res) => {
  res.render("numbers.ejs", {
    name: "ahmad khaled",
  });
});
app.post("/add-comment", (req, res) => {
  res.send("add comment");
});

app.delete("/delete", function (req, res) {
  res.send("Deleted successfully");
});

app.get("/counter", (req, res) => {
  let numbers = [];
  for (let i = 0; i < 100; i++) {
    numbers.push(i);
  }
  res.send(numbers);
});

app.get("/get-sum/:num1/:num2", (req, res) => {
  console.log(req.params);
  let total = Number(req.params.num1) + Number(req.params.num2);
  res.send(`The total is ${total}`);
});

app.get("/say-my-name", (req, res) => {
  // console.log(req.body);
  // console.log(req.query);
  // res.send(`My name is ${req.body.myname}, I'm ${req.query.age} years old.`);
  res.json({
    name: req.body.myname,
    age: req.query.age,
  });
});

// ---------------------------------------------------------------------------- //

// ============= ARTICLE ENDPOINTS ================ //
app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  newArticle.title = req.body.title;
  newArticle.body = req.body.body;
  newArticle.numberOfLikes = 0;
  const createdArticle = await newArticle.save();
  res.send({
    message: "A new article is created successfully.",
    article: createdArticle,
  });
});

app.get("/articles", async (req, res) => {
  const allArticles = await Article.find();
  res.json(allArticles);
});

app.get("/articles/:id", async (req, res) => {
  const articleId = req.params.id;
  const article = await Article.findById(articleId);
  res.json(article);
});

app.delete("/articles/:id", async (req, res) => {
  const articleId = req.params.id;
  await Article.findByIdAndDelete(articleId);
  res.send({ message: "article deleted successfully." });
});

app.get("/all-articles", async (req, res) => {
  const allArticles = await Article.find();
  res.render("all-articles.ejs", { allArticles: allArticles });
});
// ============= ARTICLE ENDPOINTS ================ //

// listening to the client requests
app.listen(3000, () => {
  console.log("I'm listening on port 3000...");
});
