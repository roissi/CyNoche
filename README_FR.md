# CyNoche

CyNoche est une application web qui répertorie (presque) tous les films que j'ai vu dans ma vie.

CyNoche est construit avec React et Chackra UI. Il utilise une API fournissant les data (films, notes sur 5, réalisateurs, années de sortie, affiches et résumés). Pour le stockage des données, l'application utilise PostgreSQL.

## Fonctionnalités 

- Affichage d'un catalogue de films
- Système de notation par étoiles (sur 5)
- Tri par nom des films, noms des réalisateurs, années de sortie et notes
- Recherche de films (titres et/ou réalisateurs)
- Fiche du film sélectionné (affiche + résumé)
- Version FR ou UK des fiches de film
- Dark ou light mode

***** CRUD Admin privé => merci de me demader le mot de pass *****
- Ajout d'un film dans la BDD
- Modification des informations d'un film dans la BDD
- Supression d'un film dans la BDD

## Prérequis pour l'installation locale

- Node.js et npm installés sur votre machine
- PostgreSQL installé et configuré sur votre machine

## Installation en local

1. Clonez ce dépôt sur votre machine locale en utilisant :
HTTPS :`https://github.com/roissi/CyNoche.git` ou SSH : `git clone git@github.com:roissi/CyNoche.git`

### Backend (API et Base de données)

2. Naviguez vers le répertoire Back du projet :
`cd serveur_back`

3. Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine. Vous pouvez démarrer PostgreSQL avec la commande spécifique à votre système d'exploitation.

4. Créez une BDD intitulée `movie`.

5. Passer sous Node 18 et installez les dépendances :
`nvm use 18`
`npm install`

6. Lancez sous Postgres le script SQL pour structurer et remplir la BDD :
`psql -U user -d nom de la BDD -f data/populate_movicy.sql`

7. Lancez sous Node le script pour actualiser les data avec une API externe (TMDB) :
`node updateTmdbIds.js` (patience, ça peut durer un certain temps si vous utilisez mes données)

8. Lancez l'API :
`npm start`

### Frontend

9. Ouvrez un nouveau terminal et naviguez vers le répertoire Front du projet :
`cd serveur_front`

4. Passer sous Node 18 et installez les dépendances :
`nvm use 18`
`npm install`

4. Lancez l'application :
`npm start`

5. Ouvrez votre navigateur et visitez `http://localhost:3000`

## Configuration des variables d'environnement

Pour que l'application fonctionne correctement sur votre machine, vous devez définir certaines variables d'environnement. Voici les étapes à suivre :

### Pour le Frontend :
1. Dans le répertoire `serveur_front`, copiez le fichier `.env.example` et renommez cette copie `.env`.

2. Ouvrez le nouveau fichier `.env` et ajoutez la valeur de `REACT_APP_TMDB_API_KEY` avec votre propre clé API TMDB. Vous pouvez obtenir une clé API TMDB en créant un compte sur [le site de TMDB](https://www.themoviedb.org/).

### Pour le Backend (API) :

1. Dans le répertoire `serveur_back`, copiez le fichier `.env.example` et renommez cette copie `.env`.

2. Ouvrez le nouveau fichier `.env` et remplissez les valeurs comme suit :

`PORT=4500`
`PGUSER=<votre nom d'utilisateur PostgreSQL>`
`PGHOST=localhost`
`PGDATABASE=movie`
`TMDB_API_KEY=<votre propre clé API TMDB>`

Remplacez `<votre nom d'utilisateur PostgreSQL>` par votre nom d'utilisateur PostgreSQL et `<votre propre clé API TMDB>` par votre clé API TMDB.

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
- Font Awesome.

### Outils de développement
- ESLint : linter pour JavaScript et JSX, utilisé pour détecter les erreurs et les problèmes de pattern dans le code JavaScript.
- Jest : framework de tests pour JavaScript.
- @testing-library/react : bibliothèque de tests pour React, utilisée avec Jest.
- web-vitals : pour mesurer et analyser la performance de l'application web.

[Lire la version UK du README.md](https://github.com/roissi/CyNoche/blob/master/README.md)

// roissi / mai 2023 //
