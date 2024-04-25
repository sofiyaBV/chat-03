import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAppContext } from "../utils/context";
import { useAuthState } from "react-firebase-hooks/auth";
export default function AppRouter() {
  //   const user = true;

  const navigate = useNavigate();
  const { auth } = useAppContext();
  const [user] = useAuthState(auth);
  useEffect(() => {
    user ? navigate(CHAT_ROUTE) : navigate(LOGIN_ROUTE);
  }, [user, navigate]);
  return (
    <Routes>
      {user
        ? privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))
        : publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
    </Routes>
  );
}
