# Weather Report

Application météo front-end avec interface responsive et serveur Node.js local pour protéger la clé OpenWeatherMap.

Le projet permet :

- de rechercher la météo d'une ville
- d'utiliser la géolocalisation du navigateur
- d'afficher la température, le ressenti, l'humidité, le vent et la pression

## Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Dotenv
- API OpenWeatherMap

## Prérequis

Avant de lancer le projet, il faut avoir :

- Node.js installé sur la machine
- npm disponible dans le terminal
- une clé API OpenWeatherMap

Si Node.js est trop ancien, le serveur peut échouer car il utilise fetch côté Node. Une version récente de Node est recommandée.

## Installation

Dans le dossier du projet, exécuter :

```bash
npm install
```

Cette commande installe les dépendances nécessaires au serveur local.

## Configuration du .env

Le projet lit la clé API depuis un fichier .env à la racine.

1. Copier le fichier .env.example
2. Renommer la copie en .env si besoin
3. Remplacer la valeur par votre vraie clé

Contenu attendu :

```env
OPENWEATHER_API_KEY=votre_cle_api_openweathermap
```

Le fichier .env est ignoré par Git et ne doit pas être partagé.

## Lancer le projet

Depuis le dossier du projet, exécuter :

```bash
npm start
```

Le terminal doit afficher une ligne proche de :

```bash
Weather Report disponible sur http://localhost:3000
```

Ensuite :

1. Ouvrir http://localhost:3000 dans le navigateur
2. Saisir une ville ou cliquer sur le bouton de géolocalisation
3. Autoriser la géolocalisation si le navigateur le demande

Important : il ne faut pas ouvrir directement index.html dans le navigateur. Le projet doit passer par le serveur Node.js pour lire le .env et appeler l'API météo sans exposer la clé côté client.

## Scripts disponibles

```bash
npm start
```

Lance le serveur local sur le port 3000.

```bash
npm run dev
```

Lance aussi le serveur local. Dans l'état actuel du projet, ce script est identique à start.

## Structure du projet

- index.html : structure de l'interface
- style.css : design, responsive et animations
- app.js : logique front et affichage des données météo
- server.js : serveur Express et proxy vers OpenWeatherMap
- .env.example : modèle pour la variable d'environnement
- package.json : scripts et dépendances

## Fonctionnement

Le flux est le suivant :

1. Le navigateur envoie une requête locale vers /api/weather
2. server.js lit la clé OPENWEATHER_API_KEY depuis le fichier .env
3. Le serveur appelle l'API OpenWeatherMap
4. Le serveur renvoie la réponse au front
5. app.js affiche les données dans l'interface

## Problèmes fréquents

Si la page ne marche pas, vérifier en priorité :

- que npm install a bien été exécuté
- que le fichier .env existe vraiment à la racine
- que la variable OPENWEATHER_API_KEY est correctement remplie
- que le serveur a bien été lancé avec npm start
- que vous ouvrez bien http://localhost:3000 et pas le fichier index.html directement

Si le terminal affiche un message sur une clé manquante, cela signifie que le .env est absent ou mal renseigné.

## Auteur

Projet réalisé dans le cadre d'un exercice front-end autour d'une application météo.
