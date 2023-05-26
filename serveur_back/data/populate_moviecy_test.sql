-- Base de données :  "moviecy"

BEGIN;

-- Suppression des tables existantes

DROP TABLE IF EXISTS "movies","movie","moviecy";

-- Création de la table

CREATE TABLE "movies" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "date" DATE NOT NULL,
  "name" TEXT NOT NULL,
  "director" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "letterboxd_url" TEXT NOT NULL,
  "rating" DECIMAL NOT NULL,
  "tmdb_id" INTEGER,
  "overview_en" TEXT,
  "overview_fr" TEXT
);

-- Seeding

INSERT INTO "movies" (date, name, director, year, letterboxd_url, rating) VALUES
(now(),'Parasite','Bong Joon-ho','2019','https://boxd.it/hTha','4'),
(now(),'Sound of metal','Darius Marder','2019','https://boxd.it/i7Q4','3.5'),
(now(),'Nobody','Ilya Naishuller','2021','https://boxd.it/mLqS','2.5'),
(now(),'Joker','Todd Phillips','2019','https://boxd.it/h4cS','5'),
(now(),'À couteaux tirés','Rian Johnson','2019','https://boxd.it/jWEA','3'),
(now(),'Promising young woman','Emerald Fennell','2020','https://boxd.it/loRE','3.5'),
(now(),'Désigné coupable','Kevin Macdonald','2021','https://boxd.it/nWiM','2.5');

COMMIT;