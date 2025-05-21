/****************************************************************************************************************/
/****     This slice manages USER DETAILS in Redux store using Redux Toolkit                                 ****/
/****************************************************************************************************************/
/** Step 1: Define the initial user state with default values                                                  **/
/** Step 2: Create slice with reducers for setting and resetting user data                                     **/
/** Step 3: Export actions and selectors for use throughout the application                                    **/
/****************************************************************************************************************/

/** Step 1: Import Redux Toolkit helper **/
import { createSlice } from "@reduxjs/toolkit";

/** Step 2: Define initial state for user **/
export const initialState = {
  id : null,
  username : "",
  password : "",
  is_admin : "",
  name : "",
  email_address : "",
  mailing_address : "",
  phone_number : null,
  billing_address : "",
};

/** Step 3: Create userDetailsSlice with reducers **/
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
      /** Set user details after login or registration **/
      setUserDetails: (state, action) => {
      const { id, username, password, is_admin, name, email_address, mailing_address, phone_number, billing_address } = action.payload;
      state.id = id;
      state.username = username;
      state.password = password;
      state.is_admin = is_admin;
      state.name = name;
      state.email_address = email_address;
      state.mailing_address = mailing_address;
      state.phone_number = phone_number;
      state.billing_address = billing_address;
    },
    /** Reset user details on logout **/
    resetUserDetails: () => initialState
  },
});

/** Step 4: Export actions **/
export const { setUserDetails, resetUserDetails } = userDetailsSlice.actions;

/** Step 5: Export selectors **/
export const getUserDetails = (state) => state.userDetails;
export const getUserid = (state) => state.userDetails.id;

/** Step 6: Export reducer to be included in store **/
export default userDetailsSlice.reducer;
