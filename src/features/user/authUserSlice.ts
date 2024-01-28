import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthUserState {
  uid: string;
  userName: string;
  company: string;
}

const initialState: AuthUserState = {
  uid: "",
  userName: "",
  company: "",
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUserState>) => {
      const { uid, company, userName } = action.payload;
      state.uid = uid;
      state.company = company;
      state.userName = userName;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = authUserSlice.actions;

export const selectAuthUser = (state: RootState) => state.authUser;

export default authUserSlice.reducer;
