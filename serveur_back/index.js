// Import dotenv package to load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import necessary packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Import PostgreSQL client from 'pg' package
import client from './app/service/dbClient.js';

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
    // Set the port for the server
    const PORT = process.env.PORT || 4500;

    // Start the server and listen for requests on the specified port
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

// This event listener will be called when the process is about to exit
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
  client.end();
});

// This event listener will be called when an uncaught exception occurs in the application
process.on('uncaughtException', (err) => {
  console.error(`Uncaught exception: ${err}`);
  client.end();
  process.exit(1);
});

// This event listener will be called when an unhandled promise rejection occurs in the application
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  client.end();
  process.exit(1);
});

// Call function to start the server
startServer();
