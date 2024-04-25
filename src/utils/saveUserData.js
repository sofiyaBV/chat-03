import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Firestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// хук отримання повідомлень

export function addUserDB({ uid, displayName, email, photoURL }, users) {
  // console.log(uid, displayName, email, photoURL);
  // console.log(users);
  const existingUser = users.find((user) => user.uid === uid);
  if (existingUser) {
    return;
  }

  const authUser = {
    uid: uid,
    name: displayName,
    email: email,
    photoUrl: photoURL,
  };
  const userCollection = firebase.firestore().collection("users");
  userCollection.add(authUser);
}
