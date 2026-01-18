# REDUX STORE

## OVERVIEW

Classic Redux (pre-Toolkit) with redux-thunk + redux-persist. Each slice follows 3-file pattern.

## STRUCTURE

```
store/
├── index.ts         # configureStore + persistor setup
├── rootReducer.ts   # combineReducers + State interface + persistConfig
├── user/            # Auth state (JWT token, user info)
├── restaurants/     # Search results from API
├── favorites/       # User's favorite lists
├── darkMode/        # Theme toggle (persisted)
├── dialog/          # Login dialog open/close
├── message/         # Confirmation dialog state
└── inviteKey/       # Invite key management
```

## SLICE PATTERN (MANDATORY)

Each slice folder contains exactly 3 files:

```
sliceName/
├── actions.ts   # Thunk actions + action creators
├── reducer.ts   # Pure reducer function
└── types.ts     # Action type constants + TS interfaces
```

### Example: Adding new slice

```typescript
// types.ts
export const SET_FOO = 'SET_FOO';
export interface Foo { id: string; name: string; }
interface SetFooAction { type: typeof SET_FOO; payload: Foo; }
export type FooActionTypes = SetFooAction;

// reducer.ts
import { SET_FOO, Foo, FooActionTypes } from './types';
const initialState: Foo = null;
export default (state = initialState, action: FooActionTypes): Foo => {
  switch (action.type) {
    case SET_FOO: return action.payload;
    default: return state;
  }
};

// actions.ts
import { Dispatch } from 'redux';
import { SET_FOO, Foo, FooActionTypes } from './types';
export const setFoo = (foo: Foo): FooActionTypes => ({ type: SET_FOO, payload: foo });
export const fetchFoo = () => async (dispatch: Dispatch) => {
  const res = await fetch('/api/foo');
  dispatch(setFoo(await res.json()));
};
```

## PERSISTENCE

Configured in `rootReducer.ts`:
- **Persisted**: `user`, `darkMode`
- **Blacklisted**: `message`, `dialogIsOpen`, `restaurants`, `favorites`, `inviteKeys`

## STATE INTERFACE

```typescript
interface State {
  user: User;           // null when logged out
  inviteKeys: string[];
  darkMode: boolean;
  message: Message;     // { open, confirmFunction, content }
  dialogIsOpen: boolean;
  restaurants: Restaurant[];
  favorites: Favorite[];
}
```

## ANTI-PATTERNS

- **NEVER** mutate state directly in reducers
- **AVOID** putting API URLs in actions — use relative paths (`/api/...`)
- **DO NOT** add new slices without updating `rootReducer.ts` combineReducers
- **DO NOT** persist sensitive data (tokens stored in `user` are acceptable per design)

## CONVENTIONS

- Action type constants: `SCREAMING_SNAKE_CASE`
- Thunk actions: async functions returning `(dispatch: Dispatch) => Promise<void>`
- Use `useSelector<State, SliceType>` with explicit type params
- Use `useDispatch` from react-redux, not custom typed version
