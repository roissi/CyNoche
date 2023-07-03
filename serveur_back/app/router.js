// Import express module
import express from "express";
// Create a new router object
const router = express.Router();

// Import the movieController module from the controller directory
import movieController from "./controller/movieController.js";
// Import the logController
import logController from "./controller/logController.js";

// Define a route to get all movies
router.get("/movies", movieController.getAllMovies);
// Define a route to search for movies
router.get("/movies/search", movieController.searchMovies);
// Define a route to get all movies sorted in a specific order
router.get("/movies/sort", movieController.getAllMoviesBySort);
// Define a route to get a movie by its ID
router.get("/movies/:id", movieController.getMovieById);
// Define a route to delete a movie by its ID
router.delete("/movies/delete/:id", movieController.deleteMovie);
// Define a route to create a new movie
router.post("/movies", movieController.createMovie);
// Define a route to update an existing movie by its ID
router.patch("/movies/update/:id", movieController.updateMovie);

// Define a route to log an action
router.post("/log", logController.logAction);

// Export the router object so it can be used in other modules
export default router;