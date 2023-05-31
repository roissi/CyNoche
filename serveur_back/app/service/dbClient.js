// Importing the necessary modules
import pg from "pg"; // PostgreSQL client
import dotenv from 'dotenv'; // Module to load environment variables from .env file

// Load environment variables from your .env file into process.env
dotenv.config();

// Destructure Client from the 'pg' module
const { Client } = pg;

// Create a new client instance with the database connection parameters
const client = new Client({
  host: process.env.PGHOST, // PostgreSQL host (server)
  user: process.env.PGUSER, // PostgreSQL user
  database: process.env.PGDATABASE, // Database to connect to
  port: process.env.PGPORT // PostgreSQL server port
});

// Attempt to connect to the database
client
  .connect()
  // In case of successful connection, log it
  .then(() => console.log("Connected to the database"))
  // In case of an error, log it
  .catch((err) => console.error("Error connecting to the database: ", err));

// Export the database client for use in other parts of the application
export default client;