# API pour le projet final

## Cloner ce git

`git clone https://github.com/mattheri/projetfinalapi.git` puis `cd/projetfinalapi && npm install`

## Pour déployer sur Heroku

1. Créer un fichier .env
2. Ajouter deux clés: `SERVER` et `DATABASE`
3. Créer une base de données sur [MongoDB](https://cloud.mongodb.com/)
4. Une fois que la base de données est crée, aller dans le projet et trouver le cluster
5. Cliquer sur `CONNECT` puis choisir `Connect your application`
6. Aller dans `Database Access`
7. Cliquer sur `Edit`
8. Ajouter un nouveau mot de passe (je suggère d'en générer un aléatoire)
9. Dans le fichier .env clé `SERVER` ajouter la partie avant `/myFirstDatabse?`. Remplacer `<password>` par le mot de passe auto-généré précédemment
10. Dans le fichier .env clé `DATABASE` ajouter la partie `myFirstDatabase?retryWrites=true&w=majority`. Remplacer `myFirstDatabase` par le nom du cluster
11. Ne pas oublier d'ajouter ces variables d'environnement dans Heroku en allant dans `Settings > Config Vars`.

[Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)

### Exemple fichier .env

![exemple fichier](code1.png)

## Modifications

- Vous pouvez modifier les endpoints dans le fichier `server.js`.
- Vous pouvez modifier les schemas dans le folder `db/schema`.
- Vous pouvez modifier les routes dans le folder `router`.

## Utilisation

Je conseille d'utiliser un programme comme [Insomnia](https://insomnia.rest/) afin de tester les endpoints et de ne pas polluer l'API.

Le endpoint de l'API est:
`https://lit-shelf-44437.herokuapp.com/api/`

### Utilisateurs

```
{
    courriel: string,
    role: string,
    hash: string,
    actif: boolean,
    verifie: boolean,
    premiereConnexion: boolean,
    entiteId: string,
    type: "etudiant" | "entreprise",
}
```

- endpoint: `utilisateur`
- créer: `POST` avec un body
- get tous: `GET`
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`
- créer avec authentification: `POST /signup` avec un body contenant une propriété `password` et `courriel`
- authentifier un utilisateur: `POST /login` avec un body contenant une propriété `password` et `courriel`

### Étudiants

```
{
    nom: string,
    prenom: string,
    telephone: string,
    ville: string,
    competences: string[],
    formations: string[],
    cv: string,
    verifie: boolean
}
```

_Je n'ai pas géré les fichiers attachés._

- endpoint: `etudiant`
- créer: `POST` avec un body
- get tous: `GET`
- get avec pagination (séparés en array pour n'avoir qu'une partie à la fois): `GET /paginate?page=X&perpage=X` où `page` représente l'index de l'array que vous voulez avoir et `perpage` représente le nombre d'items par array
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Entreprises

```
{
    nom: string,
    nomPersonneContact: string,
    prenomPersonneContact: string,
    telephone: string,
    adresse: string,
    ville: string,
    siteWeb: string,
    logo: string,
    description: string,
    secteurActivite: string[],
    typesPostes: string[],
    role: string,
    actif: boolean,
    verifie: boolean
}
```

- endpoint: `entreprise`
- créer: `POST` avec un body
- get tous: `GET`
- get avec pagination (séparés en array pour n'avoir qu'une partie à la fois): `GET /paginate?page=X&perpage=X` où `page` représente l'index de l'array que vous voulez avoir et `perpage` représente le nombre d'items par array
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Regions

```
{
    nom: string,
    actif: boolean,
    verifie: boolean,
    slug: string
}
```

- endpoint: `region`
- créer: `POST` avec un body
- get tous: `GET`
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Secteurs d'activité

```
{
    nom: string,
    actif: boolean,
    verifie: boolean,
    slug: string
}
```

- endpoint: `activite`
- créer: `POST` avec un body
- get tous: `GET`
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Demandes de stages

```
{
    titre: string,
    programmeSuivi: string,
    autresFormations: string[],
    competences: string[],
    descriptionPosteRecherche: string,
    ville: string,
    dateDebut: Date,
    dateFin: Date,
    nbHeuresSemaine: number,
    type: string,
    duree: number,
    remunere: boolean,
    dateParution: Date,
    autresInformations: string,
    etudiant: string,
    actif: boolean,
    verifie: boolean
}
```

- endpoint: `demandes`
- créer: `POST` avec un body
- get tous: `GET`
- get avec pagination (séparés en array pour n'avoir qu'une partie à la fois): `GET /paginate?page=X&perpage=X` où `page` représente l'index de l'array que vous voulez avoir et `perpage` représente le nombre d'items par array
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Offres de stage

```
{
    titre: string,
    entreprise: string,
    secteurActivite: string[],
    ville: string,
    dateDebut: Date,
    dateFin: Date,
    duree: number,
    description: string,
    nbHeuresSemaine: number,
    competences: string[],
    remunere: boolean,
    emploiApresStage: boolean,
    dateParution: Date,
    informationsSupplementaires: string,
    vedette: boolean,
    entreprise: string,
    actif: boolean,
    verifie: boolean
}
```

- endpoint: `stage`
- créer: `POST` avec un body
- get tous: `GET`
- get avec pagination (séparés en array pour n'avoir qu'une partie à la fois): `GET /paginate?page=X&perpage=X` où `page` représente l'index de l'array que vous voulez avoir et `perpage` représente le nombre d'items par array
- get un seul par id: `GET /id`
- mettre à jour: `PUT /id` avec un body
- supprimer: `DELETE /id`

### Message

```
{
    input: string,
    output: string,
    message: string,
    date: Date,
    active: boolean,
    readInput: boolean,
}
```

- endpoint: `message`
- créer: `POST` avec un body
- get tous: `GET /id` où `id` est l'id de la personne et non du message
- mettre à jour: `PUT /id` avec un body
