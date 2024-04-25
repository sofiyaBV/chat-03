import { Avatar, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../utils/context";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Friends({ users }) {
  const { handleSenlectUser, userId, auth } = useAppContext();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user] = useAuthState(auth);
  const currentUser_id = user?.uid;
  // console.log(users);

  function handlerUserClick(userId) {
    setSelectedUserId(userId);
    handleSenlectUser(userId);
  }

  return (
    <Container>
      <Grid xs={{ with: "large" }} paddingTop={"40px"}>
        {users
          .filter(({ uid }) => uid !== currentUser_id)
          .map(({ name, photoUrl, uid }) => (
            <NavLink
              to={"#"}
              key={uid}
              onClick={(e) => {
                e.preventDefault();
                handlerUserClick(uid);
              }}
            >
              <Grid
                container
                alignItems={"center"}
                gap={"10px"}
                // border={"1px solid tomato"}
                borderRadius={"10px"}
                padding={"10px"}
                style={{
                  backgroundColor:
                    uid === selectedUserId
                      ? "rgb(181, 223, 249)"
                      : "transparent",
                }}
              >
                <Avatar src={photoUrl} />
                <Grid
                  bgcolor="#434e74"
                  color="white"
                  padding="10px"
                  borderRadius="20px"
                >
                  <p color="#ffff">{name}</p>
                </Grid>
              </Grid>
            </NavLink>
          ))}
      </Grid>
    </Container>
  );
}
