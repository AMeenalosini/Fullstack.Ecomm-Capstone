import { createSlice } from "@reduxjs/toolkit";

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

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
      setUserDetails: (state, action) => {
      console.log("setUserDetails dispatched with:", action.payload);
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
    resetUserDetails: () => initialState
  },
});

export const { setUserDetails, resetUserDetails } = userDetailsSlice.actions;


// Selectors
export const getUserDetails = (state) => state.userDetails;
export const getUserid = (state) => state.userDetails.id;

export default userDetailsSlice.reducer;
