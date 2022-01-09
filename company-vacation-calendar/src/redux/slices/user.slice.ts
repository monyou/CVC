import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../services/auth.service";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.data = action.payload;
    },
    logoutUser(state) {
      logout();
      state.data = {};
    },
  },
});

// Thunks

// Selectors
export const selectUser = (state: any) => state.user.data;

// Actions and Reducer
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
