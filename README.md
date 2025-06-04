# centrale-ei-web

## Backend

### Project setup

```
cd backend
npm install
cp .env.example .env
```

### Run database migrations

```
npm run migration:run
```

### Start and auto-reload for development

```
npm run dev
```

### Start for production

```
npm run start
```

### Lint and fix files

```
npm run lint
```

## Frontend

### Project setup

```
cd frontend
npm install
```

### Compile and hot-reload for development

```
npm run dev
```

### Compile and minifiy for production

```
npm run build
```

### Lint and fix files

```
npm run lint
```

CinéSphère

Taches:
categories, barre de recherche --DAVID
100+ films
Remplir base de données/profil admin --SACHA
Page dédiée pour chaque film  
Notations (like/dislike/etoiles)  
Films triés par pertinence fct des likes -> recommendation au choix --ALEXIS
* Algo de recommendation OK
* Exploitation de la base de donnée pour créer les matrices sparses de l'utilisateur et des films
* implémentation dans le front

Beau et sans bug

Bonus:
Plusieurs profils utilisateur
Un bouton pour pas tt afficher ("load more")

Python:
1ere possibilité: créer une API python (FastApi) et l'appeler du front
2e possibilité: executer un script python depuis le backend

1)
Créer un api middleware qui fera tourner votre algorithme de recommendation
Créer une api avec fastApi et l'appeler depuis le front
??
Mieux

2)
Créer script
rendre ce script callable en ligne de commande avec la librairie "typer"
Créer une route backend qui appelle ce script avec la fonction execFile de child_process (module JS?)
recuperer le resultat via stdout (=print) et le lire comme un JSON