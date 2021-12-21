const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const app = express();
// this single line connects you to the database - can be named whatever you want.
mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
// this will allow us to override the method and call things like 'delete'
app.use(methodOverride("_method"));
app.get("/", async (req, res) => {
  // passing articles into the res.render
  const articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.listen(3000);
