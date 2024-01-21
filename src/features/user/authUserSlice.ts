import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthUserState {
  uid: string;
  status: "idle" | "loading" | "failed";
  name: string;
  company: string;
}

const initialState: AuthUserState = {
  uid: "",
  status: "idle",
  name: "",
  company: "",
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = authUserSlice.actions;

export const selectAuthUser = (state: RootState) => state.authUser;

export default authUserSlice.reducer;
