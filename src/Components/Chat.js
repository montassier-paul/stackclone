import React, { useState, useEffect } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import { StarBorderOutlined } from '@mui/icons-material';
import { InfoOutlined } from '@mui/icons-material';
import { doc, getDoc, orderBy, query,  getDocs, collection, onSnapshot   } from "firebase/firestore";
import {db} from '../firebase';
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomsMessages] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            if (roomId) {
                const docRef = doc(db, "rooms", roomId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRoomDetails(docSnap.data())
                } else {

                }

                const messagesQuery = query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp"));


                onSnapshot(messagesQuery, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            setRoomsMessages(prev => [...prev? prev : [], change.doc.data()])
                        }
                    });
                    });

            }

        }

        fetchData()

        return () => {

            setRoomsMessages(null)
        }



    }, [roomId])



    return (
        <div className='chat'>

            <div className='chat_header'>
                <div className="chat_headerLeft">
                    <h4 className='chat_channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlined />
                    </h4>
                </div>

                <div className='chat_headerRight'>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>

            </div>
            
            <div className='chat_messages'>

                {roomMessages?.map((message, key) => {
                    return <Message message={message.message} timestamp={message.timestamp? new Date(message.timestamp.toDate()).toUTCString() : new Date(Date.now()).toUTCString()} user={message.user} userImage={message.userImage} key={key}/>
                })

                }

            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>

        </div>
    )
}

export default Chat