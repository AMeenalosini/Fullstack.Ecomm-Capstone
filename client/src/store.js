
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { ecommApi } from "./api/ecommApi";
import userDetailsReducer from "./features/users/userDetailsSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userDetails"], // only persist this slice
};

// Combine your reducers
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  [ecommApi.reducerPath]: ecommApi.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(ecommApi.middleware),
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;
