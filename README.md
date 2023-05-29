# CyNoche

CyNoche est une application web de critiques de films conçue pour aider les amateurs de cinéma à découvrir de nouveaux films, à partager leurs avis et à interagir avec d'autres passionnés. L'application propose un catalogue de films, la possibilité de noter et de critiquer chaque film, ainsi qu'une fonctionnalité de recherche pour faciliter la navigation dans le catalogue.

CyNoche est construit avec React et Chackra UI. Il utilise une API fournissant les data (films et informations sur les films). Pour le stockage des données, l'application utilise PostgreSQL.

## Fonctionnalités 

- Affichage d'un catalogue de films
- Système de notation par étoiles (sur 5)
- Ajout d'un film dans la BDD
- Modification des informations d'un film dans la BDD
- Supression d'un film dans la BDD
- Recherche de films (titres et/ou réalisateurs)
- Fiche du film sélectionné (affiche + pitch)
- Version FR ou UK
- Dark ou light mode

## Prérequis pour l'installation locale

- Node.js et npm installés sur votre machine
- PostgreSQL installé et configuré sur votre machine
- API fournissant les données des films

## Installation en local

### Frontend

1. Clonez ce dépôt sur votre machine locale en utilisant :

HTTPS :`https://github.com/roissi/CyNoche.git`

SSH : `git clone git@github.com:roissi/CyNoche.git`

2. Naviguez vers le répertoire du projet :
`cd cynoche`
`bash`
`Copy code`

3. Installez les dépendances du projet :
`npm install`

markdown
Copy code

4. Lancez l'application en mode développement :
`npm start`

5. Ouvrez votre navigateur et visitez `http://localhost:3000`

### Backend (API et Base de données)

1. Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine. Vous pouvez démarrer PostgreSQL avec la commande spécifique à votre système d'exploitation.

2. Assurez-vous également de lancer l'API qui fournit les données de films. Suivez les instructions fournies avec l'API pour savoir comment la démarrer.

Remarque : Ces instructions supposent que vous avez accès à l'API fournissant les données des films et que vous l'avez configurée correctement. Assurez-vous que l'API est en cours d'exécution et accessible depuis votre application frontend.

## Technologies et dépendances utilisées

### Backend
- Node.js (v18.12.1) : environnement d'exécution côté serveur pour JavaScript.
- Express.js : framework pour créer des applications web sur Node.js.
- PostgreSQL : système de gestion de base de données relationnelle.
- CORS : middleware pour activer le partage de ressources entre origines multiples (Cross-Origin Resource Sharing).
- Axios : bibliothèque pour faire des requêtes HTTP depuis le navigateur et Node.js.
- Dotenv : pour charger les variables d'environnement à partir d'un fichier .env.

### Frontend
- React.js : bibliothèque JavaScript pour créer des interfaces utilisateur.
- Chakra UI : bibliothèque de composants UI pour React.
- Axios : bibliothèque pour faire des requêtes HTTP depuis le navigateur et Node.js.
- React-router-dom : bibliothèque de routage pour React.
- React-query : bibliothèque pour la gestion des états de requête (fetching, caching, synchronization).
- React-icons : bibliothèque d'icônes pour React.
- @fortawesome/fontawesome-svg-core : bibliothèque d'icônes de Font Awesome pour React.
- @fortawesome/free-solid-svg-icons : pack d'icônes solides de Font Awesome.
- @fortawesome/free-regular-svg-icons : pack d'icônes régulières de Font Awesome.

### Outils de développement
- ESLint : linter pour JavaScript et JSX, utilisé pour détecter les erreurs et les problèmes de pattern dans le code JavaScript.
- Jest : framework de tests pour JavaScript.
- @testing-library/react : bibliothèque de tests pour React, utilisée avec Jest.
- web-vitals : pour mesurer et analyser la performance de l'application web.