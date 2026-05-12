# Vérification des droits — NGUYEN

## Routes 
### Routes publiques
| Méthode | Route          |
| ------- | -------------- |
| POST    | /auth/login    |
| POST    | /auth/register |
| GET     | /products      |
| GET     | /products/:id  |
### Routes protégées
| Méthode | Route       |
| ------- | ----------- |
| GET     | /auth/me    |
| POST    | /payment    |
| POST    | /orders     |
| GET     | /orders/:id |
| POST    | /products     |
| PUT     | /products/:id |
| DELETE | /products/:id |


## Objectif général

La partie “vérification des droits” consiste à :

- vérifier si un utilisateur est connecté,
- identifier l’utilisateur connecté,
- vérifier le droit d’effectuer une action,
- protéger certaines routes de l’API,
- permettre aux autres groupes (Front, Paiement, Catalogue) d’utiliser correctement le système d’authentification.

## JWT Token

Après une connexion réussie, l’API Auth renvoie un JWT token.

Le token sera envoyé par le Front dans les routes protégées avec le header :

Authorization: Bearer <token>

Payload prévu :

{
  "id": "string",
  "email": "string",
  "username": "string"
}

Le token expire après 5 minutes.

## Gestion des erreurs

| Code | Signification | Action côté Front |
| ---- | ------------- | ----------------- |
| 401 | Identifiants incorrects lors du login | Afficher un message d’erreur |
| 401 | Token manquant, invalide ou expiré | Supprimer le token et rediriger vers login |

## Règles d’accès

- Les routes publiques sont accessibles sans token.
- Les routes protégées nécessitent un token JWT valide.
- Il n’y a pas de rôle admin/client prévu pour le moment.
- Les actions catalogue comme POST/PUT/DELETE produits seront gérées par le groupe Catalogue selon leur organisation.
- Le paiement nécessite uniquement que l’utilisateur soit connecté.

## Besoins pour les autres groupes

### Front

Le Front :
- stocker le token après login,
- envoyer le token dans le header Authorization,
- rediriger vers login si l’API retourne 401.

### Paiement

Le groupe Paiement :
- vérifier que l’utilisateur est connecté avant le paiement,
- envoyer le token dans les requêtes de paiement,
- utiliser les informations du token si besoin pour associer le paiement à l’utilisateur.

### Catalogue

Le groupe Catalogue doit :
- préciser quelles routes nécessitent une authentification,
- confirmer si certaines actions doivent être limitées ou non.

## À confirmer

- Le payload final du token : id, email, username ou name 
- Le nom exact des routes de paiement.
- Le nom exact des routes catalogue.
- La façon dont le Front stocke le token.
- La création ou non d’un endpoint /auth/me.