/******************************************************************************************************/
/****     Redux Store Configuration with Redux Toolkit and Redux Persist                           ****/
/******************************************************************************************************/
/** Step 1: Import required modules and slices                                                       **/
/** Step 2: Configure redux-persist to persist the userDetails slice                                 **/
/** Step 3: Combine reducers including RTK Query API slice                                           **/
/** Step 4: Create the Redux store with middleware                                                   **/
/** Step 5: Export both the store and the persistor                                                  **/
/******************************************************************************************************/

/** Step 1: Imports **/
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { ecommApi } from "./api/ecommApi";
import userDetailsReducer from "./features/users/userDetailsSlice";

/** Step2: Configuration for redux-persist **/
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userDetails"], // only persist this slice
};

/** Step3: Combine reducers **/
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  [ecommApi.reducerPath]: ecommApi.reducer,
});

/** Step4: Create persisted reducer **/ 
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Step5: Create the Redux store **/
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(ecommApi.middleware),
});

/** Step6: Export the store and persistor **/
export const persistor = persistStore(store);
export default store;
