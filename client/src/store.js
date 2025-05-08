import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import userDetailsReducer from "./features/users/userDetailsSlice";
import { ecommApi } from "./api/ecommApi";
//import { authAPI } from "./api/authApi";

const store = configureStore({
  reducer: {
//    user: userReducer,
//    userDetails: userDetailsReducer,
     [ecommApi.reducerPath]: ecommApi.reducer,
 //    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecommApi.middleware),
});

export default store;