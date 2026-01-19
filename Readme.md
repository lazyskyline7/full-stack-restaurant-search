# Restaurant search web app example


## To Use

### Requirements

- Node.js v22 or higher
- MongoDB instance (local or remote)

### Configuration
1. Copy `.env.example` to `.env` in the project root.
2. Set `SECRET_KEY` (JWT secret) and `MONGO_URL` (MongoDB connection string) in `.env`.
3. Set `INITIALIZE_DB=true` for the first run to seed the database from `hours.csv`. **After initialization, set it back to `false` to avoid reseeding on every start.**

### Build and Run (Development)

```zsh
yarn install
yarn local-start
```

This will build the frontend and start the backend server on [http://localhost:8000/](http://localhost:8000/).

### Production Build

```zsh
yarn build
yarn start
```

The server will serve the production frontend from `/build/frontend`.

## Demo (Deprecated)

~~[Full Stack Restaurant Search](https://full-stack-restaurant-search.herokuapp.com/)~~
