import { createContext, useContext, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt2UffPiHXDh5wlpgUVUB5KBz7c_7AC-4",

  authDomain: "perfectchat-89ccb.firebaseapp.com",

  databaseURL:
    "https://perfectchat-89ccb-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "perfectchat-89ccb",

  storageBucket: "perfectchat-89ccb.appspot.com",

  messagingSenderId: "310569895534",

  appId: "1:310569895534:web:4c89a85dc882f15ae3487f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [users] = useCollectionData(
    firestore.collection("users").orderBy("uid")
  );

  const handleSenlectUser = (selectedUser) => {
    setUserId(selectedUser);
  };
  return (
    <AppContext.Provider
      value={{ firebase, auth, firestore, users, handleSenlectUser, userId }}
    >
      {children}
    </AppContext.Provider>
  );
};
