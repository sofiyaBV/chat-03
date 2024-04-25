import { AppBar, Avatar, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import { useAppContext } from "../utils/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";

export default function Navigation() {
  const { auth } = useAppContext();
  const [user] = useAuthState(auth);
  return (
    <AppBar color={"default"} position="static">
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={"0 20px"}
      >
        <Avatar
          src={
            user && user.photoURL
              ? user.photoURL
              : "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
          }
        />
        <Toolbar>
          <Grid container justifyContent={"flex-end"}>
            {user ? (
              <Button
                color={"warning"}
                variant={"outlined"}
                onClick={() => auth.signOut()}
              >
                Вийти
              </Button>
            ) : (
              <NavLink to={LOGIN_ROUTE}>
                <Button color={"primary"} variant={"outlined"}>
                  Увійти
                </Button>
              </NavLink>
            )}
          </Grid>
        </Toolbar>
      </Grid>
    </AppBar>
  );
}
