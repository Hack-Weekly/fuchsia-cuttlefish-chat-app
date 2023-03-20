import { Link } from 'react-router-dom';

const ChatRoom = ({ roomName }) => {
    return (
        <div className="chat-room-select">
            <Link to={`r/${roomName}`}>{roomName}</Link>
        </div>
    );
};

export default ChatRoom;