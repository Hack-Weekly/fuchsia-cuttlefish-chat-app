# fuchsia-cuttlefish-chat-app

Repo for Fuchsia Cuttlefish Team!

## TECHSTACK

### Backend

Firebase - [guide](https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/)

### Frontend

React

## PREREQUISITES

NodeJS - [download](https://nodejs.org/en)\
Firebase Project - [link](https://firebase.google.com/)\
Firebase Emulator - [link](https://firebase.google.com/docs/emulator-suite)

## DEPLOY

1. Clone repo
2. Navigate to project and `npm install` to install modules
3. Create new file in 'src' directory named "firebase.js" and copy the code below

- Copy firebaseConfig information from your Firebase Project Settings (gearbox in top left panel) into firebase.js

```javascript
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: ??,
  authDomain: ??,
  projectId: ??,
  storageBucket: ??,
  messagingSenderId: ??,
  appId: ??,
  measurementId: ??,
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

note - `const use_emulator` variable\
5. `npm start` to start React project - if you've put in the firebase config in, it should work fine.

## FIREBASE LOCAL SET UP - [guide](https://firebase.google.com/docs/emulator-suite)

1. Run `npm install -g firebase-tools -f`
2. Navigate to your JavaScript Project and run `firebase init`

- If you get `'Error: Failed to authenticate, have you run firebase login'`, run `firebase login` and log in
- Select the modules you want to enable (I enabled Authenticator, Firestore, and Functions)
- Select default ports when prompted

3. After the emulator has been initialized, run `firebase emulators:start` to start your emulator
4. In your firebase.js file, change the use_emulator variable to `true` in order to connect your app to emulator


### CHAT ROOM FIRESTORE SETUP

1. Go to `Firestore Database` in the firebase dashboard.
2. Click `Start collection` and name it `rooms`. This will have the fields:

```
  name: string
  description: string
  createdAt: timestamp
```

3. Once you have the new collection you should be able to add new chat rooms from the main page, and once you send messages in those new chat rooms you should see a new `room` field in the messages collection. (older messages won't show up anywhere)
4. 

## FIREBASE STORAGE SETUP

1. In the sidebar go to `Storage` and click `Get started`.
2. Select `start in production mode`.
3. Select a location for your default Cloud Storage bucket, click `Done`.
4. Go to `Rules` and change the permission to allow file uploads, it should look something like this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write, create;
    }
  }
}
```

5. Now you can try uploading images in the chat and you should see them show up in a folder names `images`
