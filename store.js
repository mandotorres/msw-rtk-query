import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from './services/pokemon'

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    getDefaultMiddleware({
      // immutableCheck: false,
      serializableCheck: false,
    }).concat(pokemonApi.middleware)
})

export default store
