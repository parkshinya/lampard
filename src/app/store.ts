import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authUserReducer from "../features/user/authUserSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
