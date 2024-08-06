// store.js

import { configureStore,  } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DZapi } from "./services/DZapi";

export const store = configureStore({
  reducer: {
    [DZapi.reducerPath]: DZapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DZapi.middleware),
});

setupListeners(store.dispatch);
