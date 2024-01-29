import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export function configureAppStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: {
      books: bookReducer,
    },
    preloadedState,
  });
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
