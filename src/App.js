import "./App.css";
import NavBar from "./components/NavBar";
import ChatContainer from "./components/ChatContainer";
import Welcome from "./components/Welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatContainer />}
    </div>
  );
}

export default App;
