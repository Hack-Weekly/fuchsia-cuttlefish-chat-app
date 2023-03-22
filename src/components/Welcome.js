import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch (e) {}
  };

  return (
    <main className="welcome">
      <h2>Welcome to the Cuttlefish Club!</h2>
      <img
        src="/logo192.png"
        alt="Cuttlefish Club logo"
        width={192}
        height={192}
      />
      <p>Sign in with Google to chat with the Cuttlefish</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
          height={40}
        />
      </button>
    </main>
  );
};

export default Welcome;
