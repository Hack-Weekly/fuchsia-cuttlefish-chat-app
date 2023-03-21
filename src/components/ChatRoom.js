import { Link } from 'react-router-dom';

const ChatRoom = ({ roomName, roomDescription }) => {
    return (
        <div className="chat-room-select">
            <Link to={`r/${roomName}`} style={{ textDecoration: 'none' }}>
                <div className="chat-room-text" style={{ display: 'flex', justifyContent: 'flex-start', padding: 20 }} >
                    <div style={{ marginRight: 10, fontWeight: 'bold' }}>{roomName}</div>
                    <div style={{ flex: 'grow' }}>{roomDescription}</div>
                </div>
            </Link>
        </div>
    );
};

export default ChatRoom;