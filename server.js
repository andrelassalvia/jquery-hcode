const express = require("express");
const cors = require("cors");
const nedb = require("nedb");
const db = new nedb({ filename: "./database.db", autoload: true });

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/books", (req, res) => {
  db.find({}, (err, books) => {
    res.json(books);
  });
});

app.post("/books", (req, resp) => {
  db.insert(
    {
      name: req.body.name,
      author: req.body.author,
    },
    (err, doc) => {
      resp.json(doc);
    }
  );
});

app.delete("/books/:id", (req, res) => {
  db.remove(
    {
      _id: req.params.id,
    },
    (err) => {
      res.json({
        success: true,
      });
    }
  );
});
app.listen(3000, () => {
  console.log("Servidor sendo executado. Porta:3000");
});
