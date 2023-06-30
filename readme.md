# Getting Started with node server App

## Installation

Open the server folder using vscode and write in the terminal "npm i" to install all
the dependencies that needed to run the server.

## Available Scripts

you can run:

### `npm tun dev`

- It will run the app with node
- The page will reload if you make edits.
- The database is local

### `npm start`

- The page will reload if you make edits
- The print at the terminal will be blue with the message:
- The database is from atlas

`server run on: http://:localhost : 8181`

And if there are no login errors you should see the message painted in yellow:

`connected to MongoDb!`

### Available Routes

###### USERS

#### Register a new user

```http
  POST /api/users
```

#### Login a user

```http
  POST /api/users/login
```

#### Geting Information about all the users

```http
  GET /api/users
```

You will need to provide an admin token to get an answer from this api

#### To receive information about a user /users/:userId

```http
  GET /api/users/:userId
```

You will need to provide an admin token or the registerd user's token to get an answer from this api

#### To edit the user's information

```http
  POST /api/users/:userId
```

You will need to provide the registerd user's token to get an answer from this api

#### To change the user's business account of the registered user

```http
  PATCH /api/users/:userId
```

You will need to provide the registerd user's token to get an answer from this api

#### To delete a user

```http
  DELETE /api/users/userId
```

You will need to provide an admin token or the registerd user's token to get an answer from this api

###### CARDS

#### To get all the business cards

```http
  GET /api/cards
```

#### To get all the user's business cards

```http
  GET /api/cards/my-cards
```

You will need the token of the registered user

#### To get a spcefice business cards

```http
  GET /api/cards/cardId
```

#### To create a business card

```http
  POST /api/cards/
```

You will need a business account token

#### To update a business card

```http
  PUT /api/cards/cardId
```

You will need to provide a registerd user token to get an answer from this api

#### To update a business card likes

```http
  PATCH /api/cards/cardId
```

You will need to provide a registerd user token to get an answer from this api

#### To delete a business card

```http
  DELETE /api/cards/cardId
```

You will need to provide a token of the registerd user or an admin to get an answer from this api
