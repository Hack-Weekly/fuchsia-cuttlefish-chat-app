import { Link } from "react-router-dom";

const ChatHeader = ({ roomName }) => {
    return (
        <div className="chat-room-header">
            <Link to="/" className="chat-room-back">{"< Back"}</Link>
            <h2 className="chat-room-title">{roomName}</h2>
        </div >
    )
};

export default ChatHeader;