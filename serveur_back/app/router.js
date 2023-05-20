// This code is setting up an Express web application. The first line is importing the Express library, which is a web application framework for Node.js. The second line is creating a router object, which is used to define routes for the application. Routes are the URLs that the application responds to, and the router object is used to define what the application should do when a user visits a particular route.

const express = require("express");
const router = express.Router();

// This code is importing the movieController module from the controller folder. The movieController module is a JavaScript file that contains functions related to the manipulation of movie data.
const movieController = require("./controller/movieController");

// This code is setting up routes for a movie controller. The first route is for getting all movies, the second route is for getting all movies sorted, the third route is for getting a movie by its id, the fourth route is for deleting a movie by its id, the fifth route is for creating a movie, and the sixth route is for updating a movie by its id.
router.get("/movies", movieController.getAllMovies);
router.get("/movies/search", movieController.searchMovies);
router.get("/movies/sort", movieController.getAllMoviesBySort);
router.get("/movies/:id", movieController.getMovieById);
router.post("/movies/delete/:id", movieController.deleteMovie);
router.post("/movies", movieController.createMovie);
router.post("/movies/update/:id", movieController.updateMovie);

// This code is used in Node.js to export a router object from a module. The router object is used to define routes and associated HTTP verbs (GET, POST, PUT, DELETE, etc.) that will be used to handle incoming requests.
module.exports = router;
