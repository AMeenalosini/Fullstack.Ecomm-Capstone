import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./features/users/userDetailsSlice";
import { ecommApi } from "./api/ecommApi";


const store = configureStore({
  reducer: {
      userDetails: userDetailsReducer,
      [ecommApi.reducerPath]: ecommApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecommApi.middleware),
});

export default store;