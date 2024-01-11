const express = require("express");
const bodyParser = require('body-parser')
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3030;

// SCHEMAS
const AuthorSchema = new mongoose.Schema({
    username: String,
    picture: Object,
    birthDate: Date,
    genre: Array,
    gender: String,
    isDead: Boolean,
  });

const AuthorModel = mongoose.model("Author", AuthorSchema);



// get all authors
app.get("/api/authors", async (req, res) => {
    const authors = await AuthorModel.find({});
    if (username) {
      const filteredAuthors = authors.filter((x) =>
        x.username.toLowerCase().trim().includes(username.toLowerCase().trim())
      );
      res.status(204).send({
        filteredAuthors,
      });
    } else {
      res.status(200).send({
        authors,
      });
    }
  });
  
  // get all authors by id
  app.get("/api/authors/:id", async (req, res) => {
    const { id } = req.params;
    const author = await AuthorModel.findById({ id });
    if (author) {
      res.status(200).send(author);
    } else {
      res.status(204).send("data not found");
    }
  });
  
  // delete author
  app.delete("/api/authors/:id", async (req, res) => {
    const { id } = req.params;
    await AuthorModel.findByIdAndDelete(id);
    const authors = await AuthorModel.find({});
    res.status(200).send({
      authors,
    });
  });
  
  // post author
  app.post("/api/authors", async (req, res) => {
    const newAuthor = new AuthorModel(req.body);
    await newAuthor.save();
    res.status(201).send({
      newAuthor,
    });
  });
  
  
  // patch author
  app.patch("/api/authors/:id", async (req, res) => {
    const { id } = req.params;
    await AuthorModel.findByIdAndUpdate(id, req.body);
    const updatedAuthor = await AuthorModel.findById({ id });
    res.send(updatedAuthor);
  });




app.get("/api", (req, res) => {
    console.log("request", req);
    res.send("Salam");
  });

app.listen(PORT, () => {
    console.log(`app listening on PORT:${PORT}`);
});
  
  mongoose
    .connect(
      process.env.DB_CONNECTION_KEY.replace("<password>", process.env.DB_PASSWORD)
    )
    .then(() => console.log("Connected to Mongo DB!"));