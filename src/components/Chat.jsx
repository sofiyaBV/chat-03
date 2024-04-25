import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Message from "./Message";
import { useAppContext } from "../utils/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import Friends from "./Friends";

export default function Chat() {
  const [value, setValue] = useState("");
  const { auth, firestore, firebase, users, userId } = useAppContext();
  const [user] = useAuthState(auth);
  // console.log(user);

  // хук отримання повідомлень
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  if (loading) {
    return <Loader />;
  }
  // console.log(messages);
  // відправка повідомлень
  const sendMessage = async () => {
    const message = {
      current_uid: user.uid,
      current_email: user.email,
      sender_uid: userId,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const chatsCollection = firestore.collection("chats");
    const chatRef = chatsCollection.doc();
    chatRef.set({ users: ["uid_1", "uid_2"], newMessage: message });

    firestore.collection("messages").add(message);
    setValue("");
  };

  return (
    <Container>
      <Grid container flexWrap="nowrap">
        <Friends users={users} />
        <Grid
          container
          justifyContent={"flex-end"}
          alignContent={"flex-start"}
          style={{
            height: window.innerHeight - 50,
            marginTop: "10px",
            width: "290%",
          }}
        >
          <Message messages={messages} />
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{
              width: "80%",
              marginTop: "20px",
              backgroundColor: "#fafafa",
            }}
          >
            <TextField
              variant={"outlined"}
              maxRows={2}
              style={{ width: "80%" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              onClick={sendMessage}
              variant={"contained"}
              style={{ marginLeft: "8px", width: "18%", height: "100%" }}
            >
              Надіслати
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
