import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ChatRoom from "./ChatRoom";

const roomsRef = collection(db, "rooms");

const ChatContainer = () => {
    const [rooms, setRooms] = useState([]);
    // const [room, setRoom] = useState('');

    // useEffect(() => {
    //     const q = query(
    //         roomsRef,
    //         orderBy("createdAt"),
    //         limit(8)
    //     );

    //     const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    //         let rooms = [];
    //         QuerySnapshot.forEach((doc) => {
    //             rooms.push({ ...doc.data(), id: doc.id });
    //         });
    //         setRooms(rooms);
    //     });
    //     return () => unsubscribe;
    // }, []);


    useEffect(() => {
        const q = query(
            roomsRef,
            orderBy("createdAt"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let rooms = [];
            QuerySnapshot.forEach((doc) => {
                rooms.push({ ...doc.data(), id: doc.id });
            });
            setRooms(rooms);
        });
        return () => unsubscribe;
    }, []);

    return (
        <main className="chat-container">
            <div>
                {rooms?.map((room) => (
                    <ChatRoom key={room.id} roomName={room.name} />
                ))}
            </div>
        </main>
    )
};

export default ChatContainer;