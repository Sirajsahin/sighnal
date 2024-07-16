import { configureStore } from "@reduxjs/toolkit";
import RoutesCombinedReducer from "../reducers/routes_reducers";

// ...

export const store = configureStore({
  reducer: {
    // root: RootCombinedReducer,
    routes: RoutesCombinedReducer,
    // auth: authReducer,
    // staticAPI: staticReducer,
    // loading: loadingReducer,
    // modals: modalReducer,
    // modal_states: modalStateReducer,
    // slideovers: slideoverReducer,
    // slideover_states: slideoverStateReducer,
    // triggers: triggerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
