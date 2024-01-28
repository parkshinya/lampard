import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import MainDisplay from "./components/MainDisplay";
import Auth from "./components/Auth";
import {
  login,
  selectAuthUser,
  logout,
  AuthUserState,
} from "./features/user/authUserSlice";
import { Navigate, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const storeUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const allUserData: AuthUserState[] = [];
      const usersQuerySnapShot = await getDocs(collection(db, "users"));
      usersQuerySnapShot.forEach((doc) =>
        allUserData.push(doc.data() as AuthUserState)
      );
      return allUserData;
    };
    const checkAuthUser = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        fetchUsers().then((dbUsers) => {
          const authUser = dbUsers.find(
            (dbUser) => dbUser.uid === firebaseUser.uid
          );

          dispatch(login(authUser!));
        });
        setLoading(true);
      } else {
        dispatch(logout());
        setLoading(true);
      }
      return () => checkAuthUser();
    });
  }, [dispatch]);

  if (!loading) return <></>;

  return (
    <Routes>
      <Route
        path="*"
        element={
          storeUser.uid ? <MainDisplay /> : <Navigate replace to="/auth" />
        }
      />
      <Route
        path="/auth"
        element={storeUser.uid ? <Navigate replace to="/" /> : <Auth />}
      />
    </Routes>
  );
};

export default App;
