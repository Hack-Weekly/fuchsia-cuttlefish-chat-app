import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxkbHe9aKcO2iiD4yqfDNme4u7LvnLaOg",
  authDomain: "fuchsia-cuttlefish-chat-b77e2.firebaseapp.com",
  databaseURL: "https://fuchsia-cuttlefish-chat-b77e2-default-rtdb.firebaseio.com",
  projectId: "fuchsia-cuttlefish-chat-b77e2",
  storageBucket: "fuchsia-cuttlefish-chat-b77e2.appspot.com",
  messagingSenderId: "520032598993",
  appId: "1:520032598993:web:c1e321872ebd2fd3f17ef0",
  measurementId: "G-DW0CBL4Y1V"
};

const app = initializeApp(firebaseConfig);

let db, auth;
const emulator = true;
if (emulator) {
  auth = getAuth(app);
  connectAuthEmulator(auth, "http://localhost:9099");

  db = getFirestore(app);
  connectFirestoreEmulator(db, "localhost", 8080);
} else {
  auth = getAuth()
  db = getFirestore()
}

export { auth, db };