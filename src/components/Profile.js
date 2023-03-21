import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  if (!user) return <></>;

  const { uid, displayName, photoURL, email } = auth.currentUser;

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#36454F",
        padding: 8,
        borderRadius: 4,
        position: "fixed",
        top: 0,
        right: 30,
      }}
    >
      {uid && (
        <img
          src={photoURL}
          alt="User Image"
          onClick={() => setOpen(!open)}
          referrerPolicy="no-referrer"
          style={{
            borderRadius: "100%",
            boxShadow: "0 0 5px -2px #000",
            marginLeft: "auto",
          }}
          width={40}
        />
      )}
      {open && (
        <>
          <div
            style={{
              fontFamily: "sans-serif",
              wordWrap: "break-word",
              marginTop: 10,
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              wordWrap: "break-word",
              marginTop: 10,
            }}
          >
            {email}
          </div>
          <button
            onClick={signOut}
            className="sign-out"
            type="button"
            style={{
              marginTop: 10,
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
