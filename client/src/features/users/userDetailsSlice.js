import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  id: null,
  reservations: [],
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { firstname, lastname, email, id, reservations } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.id = id;
      state.reservations = reservations;
    },
  },
});

export const { setUserDetails } = userDetailsSlice.actions;

// Selectors
export const getUserDetails = (state) => state.userDetails;
export const getReservations = (state) => state.userDetails.reservations;
export const getUserid = (state) => state.userDetails.id;

export default userDetailsSlice.reducer;
