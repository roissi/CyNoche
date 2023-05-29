require("dotenv").config();
const express = require("express");
const app = express();
const { Client } = require("pg");
const client = new Client();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./app/router");
app.use("/", router);

// route pour une page d'accueil simple (index.html)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ message: "An error occurred" });
});

async function startServer() {
  try {
    await client.connect();
    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
}
startServer();
