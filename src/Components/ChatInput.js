import { Button } from '@mui/material'
import React, {useState} from 'react'
import "./ChatInput.css"
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../firebase';
import { serverTimestamp } from "firebase/firestore";
import {useStateValue} from "./StateProvider"

function ChatInput({channelName, channelId}) {

    const [input, setInput] = useState('')
    const [{user}] = useStateValue(); 

    const sendMessage = async(e) => {
        e.preventDefault()

        if(channelId){

            await addDoc(collection(db, `rooms/${channelId}/messages`), {
                message : input, 
                timestamp: serverTimestamp(), 
                user : user.displayName, 
                userImage : user.photoURL, 
            });

            setInput('')


        }
    }


  return (

    <div className='chatInput'>
        <form>
            <input placeholder={`Message #${channelName}`}
            onChange={e => setInput(e.target.value)}/>
            <Button type='submit' onClick={sendMessage}>SEND</Button>
        </form>
    </div>
  )
}

export default ChatInput