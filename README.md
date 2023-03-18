# fuchsia-cuttlefish-chat-app
Repo for Fuchsia Cuttlefish Team!


## TECHSTACK\
### Backend
Firebase - [guide](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)\
### Frontend
React


## PREREQUISUITES
NodeJS - [download](https://nodejs.org/en)
Firebase Project - [link](https://firebase.google.com/)

## DEPLOY
1. Clone repo
2. `npm install` to install modules
3. Create new file in 'src' directory named "firebase.js" and copy the code below
- Copy firebaseConfig information from your Firebase Project Settings (gearbox in top left panel) into firebase.js
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: ???,
  authDomain: ???,
  projectId: ???,
  storageBucket: ???,
  messagingSenderId: ???,
  appId: ???,
  measurementId: ???,
};

const app = initializeApp(firebaseConfig);

let db, auth;

const use_emulator = false
if (use_emulator) {
  const emulatorHost = "localhost";
  const emulatorAuthPort = 9099;
  const emulatorFirestorePort = 8080;

  auth = getAuth(app);
  connectAuthEmulator(auth, `http://${emulatorHost}:${emulatorAuthPort}`);

  db = getFirestore(app);
  connectFirestoreEmulator(db, emulatorHost, emulatorFirestorePort);
} else {
  // use real Firebase services
  auth = getAuth();
  db = getFirestore();
}

export { auth, db };
```
note - `const emulator` variable\
5. `npm start` to start React project - if you've put in the firebase config in, it should work fine.

## FIREBASE LOCAL SET UP - [guide](https://firebase.google.com/docs/emulator-suite)
Run `npm install firebase`\
I had to use `npm install -g firebase-tools -f` to rectify `'firebase' is not recognized as an internal or external command'` error\
Navigate to your JavaScript Project and run `firebase init`\
If you get `'Error: Failed to authenticate, have you run firebase login'`, run `firebase login` and log in


The Firebase / React tutorial walks you through setting up a fresh React App and also a new Firebase project.
