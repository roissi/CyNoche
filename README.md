# CyNoche

CyNoche is a web application that catalogs (almost) every movie I've seen in my life.

CyNoche is built with React and Chakra UI. It uses an API to provide data (movies, ratings out of 5, directors, release years, posters, and summaries). For data storage, the application uses PostgreSQL.

## Features 

- Display of a movie catalog
- Star rating system (out of 5)
- Sorting by movie names, directors' names, release years, and ratings
- Adding a movie to the database
- Modifying a movie's information in the database
- Deleting a movie in the database
- Searching for movies (titles and/or directors)
- Selected movie's card (poster + summary)
- French or English version
- Dark or light mode

## Requirements for local installation

- Node.js and npm installed on your machine
- PostgreSQL installed and configured on your machine

## Local installation

1. Clone this repository to your local machine using:
HTTPS: `https://github.com/roissi/CyNoche.git` or SSH: `git clone git@github.com:roissi/CyNoche.git`

### Backend (API and Database)

2. Navigate to the Back directory of the project:
`cd serveur_back`

3. Make sure PostgreSQL is running on your machine. You can start PostgreSQL with the command specific to your operating system.

4. Create a database named `movie`.

5. Switch to Node 18 and install dependencies:
`nvm use 18`
`npm install`

6. Launch the SQL script under Postgres to structure and fill the database:
`psql -U user -d nom de la BDD -f data/populate_movicy.sql`

7. Launch the Node script to refresh data with an external API (TMDB):
`node updateTmdbIds.js` (be patient, this can take some time if you use my data)

8. Launch the API:
`npm start`

### Frontend

9. Open a new terminal and navigate to the Front directory of the project:
`cd serveur_front`

4. Switch to Node 18 and install dependencies:
`nvm use 18`
`npm install`

4. Launch the application:
`npm start`

5. Open your browser and visit `http://localhost:3000`


## Technologies et dépendances utilisées

### Backend
- Node.js (v18.12.1): server-side runtime environment for JavaScript.
- Express.js: framework for creating web applications on Node.js.
- PostgreSQL: relational database management system.
- CORS: middleware to enable cross-origin resource sharing.
- Axios: library for making HTTP requests from the browser and Node.js.
- Dotenv: to load environment variables from a .env file.

### Frontend
- React.js: JavaScript library for building user interfaces.
- Chakra UI: UI component library for React.
- Axios: library for making HTTP requests from the browser and Node.js.
- React-router-dom: routing library for React.
- React-query: library for query state management (fetching, caching, synchronization).
- React-icons: icon library for React.
- Font Awesome.

### Outils de développement
- ESLint: linter for JavaScript and JSX, used to detect errors and pattern problems in JavaScript code.
- Jest: testing framework for JavaScript.
- @testing-library/react: testing library for React, used with Jest.
- web-vitals: to measure and analyze the performance of the web application.

[Read the french version of README.md](https://github.com/roissi/CyNoche/blob/master/README_FR.md)

// roissi / May 2023 //