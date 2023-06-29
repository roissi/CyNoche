// Import dotenv package to load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import necessary packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Import PostgreSQL client from 'pg' package
import client from './dbClient.js';

// Initialize Express application
const app = express();

// Allow cross-origin requests from specified origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Serve static files from 'public' directory
app.use(express.static("public"));

// Use body-parser middleware to parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import and use application router
import router from "./app/router.js";
app.use("/", router);

// Route to serve a simple home page (index.html)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Middleware to handle errors and send appropriate response
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ message: "An error occurred" });
});

// Function to start the server
async function startServer() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();
    
    // Set the port for the server
    const PORT = process.env.PORT || 4500;

    // Start the server and listen for requests on the specified port
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  } finally {
    // Disconnect from the PostgreSQL database
    client.end();
  }
}

// Call function to start the server
startServer();
