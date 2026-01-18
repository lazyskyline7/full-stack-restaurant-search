# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-18
**Commit:** 95e1cd0
**Branch:** master

## OVERVIEW

Full-stack restaurant search app. Express/MongoDB backend + React/Redux frontend (CRA). Users search restaurants by operating hours, save favorites.

## STRUCTURE

```
./
├── index.ts           # Server entry + DB seeding from CSV
├── config.ts          # dotenv: SECRET_KEY, MONGO_URL, PORT
├── hours.csv          # Restaurant data (name, operating hours)
├── api/
│   ├── routes/        # Express routers (restaurant, user, favorite)
│   ├── models/        # Mongoose schemas
│   ├── util/          # strToDateProcess.ts (CSV parsing)
│   └── authenticate.ts # Passport JWT + Local strategies
├── client/            # React SPA (CRA)
│   └── src/
│       ├── store/     # Redux slices (see store/AGENTS.md)
│       ├── components/# MUI-based React components
│       ├── pages/     # Route components
│       └── util/      # dateOperations.ts (UI formatting)
└── build/frontend/    # Production SPA bundle (served by Express)
```

## WHERE TO LOOK

| Task               | Location                         | Notes                                                  |
| ------------------ | -------------------------------- | ------------------------------------------------------ |
| Add API endpoint   | `api/routes/`                    | Follow existing router pattern, register in `index.ts` |
| Add Mongoose model | `api/models/`                    | Export default, import in route                        |
| Add Redux state    | `client/src/store/`              | 3-file pattern: actions/reducer/types                  |
| Add UI component   | `client/src/components/`         | MUI v4, FC + hooks, feature folders                    |
| Add page/route     | `client/src/pages/` + `App.tsx`  | Add to React Router Switch                             |
| Auth logic         | `api/authenticate.ts`            | JWT: 7-day expiry, Bearer token                        |
| Search algorithm   | `api/routes/restaurantRouter.ts` | Handles midnight-crossing hours                        |
| DB seeding         | `index.ts`                       | Triggered by `INITIALIZE_DB=true`                      |

## CONVENTIONS

### Backend (api/)

- Express routers use async/await with try-catch, pass errors to `next()`
- Mongoose queries use `.lean().exec()` for performance
- Days stored as numeric keys 0-6 (Sun-Sat), hours as floats (e.g., 11.5 = 11:30)
- Close time > 24 = crosses midnight (e.g., 26 = 2 AM next day)
- Close time = -1 means closed that day

### Frontend (client/)

- Airbnb ESLint + Prettier (printWidth: 100)
- `React.FC` for components, no `prop-types` (use TS interfaces)
- MUI v4 (`@material-ui/core`), `createMuiTheme` for theming
- Absolute imports from `src/` enabled
- `index.tsx` barrel files in component folders

### Shared

- Types mirrored: `api/models/*.ts` ↔ `client/src/store/*/types.ts`
- Day mapping: 0=Sun, 1=Mon, ..., 6=Sat (both sides)

## ANTI-PATTERNS (THIS PROJECT)

- **DO NOT** edit `yarn.lock` files directly
- **DO NOT** set `INITIALIZE_DB=true` in production (clears all data on restart)
- **NEVER** use `yarn eject` (irreversible)
- **AVOID** `as any` — exists in `authenticate.ts` due to @types issue; don't propagate
- **DO NOT** add backend tests to root package.json (testing infra only in client/)

## UNIQUE STYLES

- Backend entry (`index.ts`) in root, not `src/` or `server/`
- Frontend build copied to `build/frontend/`, Express serves static
- No CI/CD config — manual Heroku deployment
- Typo in folder: `FavortieContent` (not `FavoriteContent`)

## COMMANDS

```bash
# Development (full-stack)
yarn install
yarn develop          # Backend only with hot reload
yarn local-start      # Build client + start server

# Client only (in client/)
cd client && yarn start  # Dev server on :3000, proxies to :8000
cd client && yarn test   # Jest + React Testing Library

# Production build
yarn build            # Compiles TS + builds React to build/
yarn start            # Runs compiled server (serves frontend)
```

## ENVIRONMENT

Copy `.env.example` to `.env`:

```
SECRET_KEY=<jwt-secret>
MONGO_URL=<mongodb-connection-string>
INITIALIZE_DB=false   # Set true ONCE for initial seed
```

## NOTES

- Node 16 required (see `engines` in package.json)
- Server listens on `process.env.PORT || 8000`
- Restaurant search handles midnight-crossing hours via "previous day" query logic
- Only `user` and `darkMode` persisted to localStorage; others cleared on refresh
- No backend test coverage — only client has Jest setup
