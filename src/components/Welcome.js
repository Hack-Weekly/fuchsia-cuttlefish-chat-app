import React from "react";
import Authentication from "./Authentication";

const Welcome = () => {
  return (
    <main className="welcome">
      <h2>Welcome to the Cuttlefish Club!</h2>
      <img
        src="/logo192.png"
        alt="Cuttlefish Club logo"
        width={192}
        height={192}
      />
      <p>Sign in to chat with the Cuttlefish Club</p>
      <Authentication />
    </main>
  );
};

export default Welcome;
