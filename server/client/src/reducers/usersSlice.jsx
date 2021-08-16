import { createSlice } from "@reduxjs/toolkit";
import Toast from "../Components/Toast/Toast";
const initialState = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      Object.assign(state, action.payload);
    },
    loggedOut: () => {
      Toast("Logged Out", 2);
      return initialState;
    },
  },
});

export const { userAdded, loggedOut } = usersSlice.actions;
export default usersSlice.reducer;
