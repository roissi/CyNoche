require('dotenv').config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database: ", err));

module.exports = client;
