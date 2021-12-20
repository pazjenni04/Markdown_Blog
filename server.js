const express = require("express");
const mongoose = require("mongoose");
const app = express();
const articleRouter = require("./routes/articles");

// this single line connects you to the database - can be named whatever you want.
mongoose.connect("mongodb://localhose/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  // passing articles into the res.render
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
    {
      title: "Test Article2",
      createdAt: new Date(),
      description: "Test2 description",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.listen(3000);
