import React from 'react'
import "./SidebarOption.css"
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import {db} from '../firebase';
import uuid from 'react-uuid';

function SidebarOption({ Icon, title, id, addChannelOption }) {

    const navigate = useNavigate()
    const selectChannel = () => {
        if(id){

            navigate(`/room/${id}`)

        }else {
            navigate(title)
        }
        
    }

    const addChannel = async() => {

        const channelName = prompt("Please enter the channel name")

        if(channelName){

            await addDoc(collection(db, "rooms"), {
                name : channelName
            });
        }
    }; 

    return (
        <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
            {Icon && <Icon className="sidebarOption_icon" />}

            {Icon
                ? <h3>{title}</h3>
                : <h3 className='sidebarOption_channel'>
                    <span className='sidebarOption_hash'>#</span>{title}
                </h3>}
        </div>
    )
}

export default SidebarOption