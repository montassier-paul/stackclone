import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {db} from '../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";
import {useStateValue} from "./StateProvider"

function Sidebar() {

    const [channels, setChannels] = useState([])
    const [idList, setIdList] = useState([])
    const [{user}] = useStateValue(); 



    useEffect(() => {

        setChannels([])

        const q = query(collection(db, "rooms"));
        const getData = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                setChannels(prev => [...prev, { id: change.doc.id, name: change.doc.data().name }]);
            }
            if (change.type === "modified") {
                setChannels(prev => prev.map(channel => {
                    if (channel.id === change.doc.id){
                        return {channel , name: change.doc.data().name }
                    }
                    return channel
                }) );
            }
            if (change.type === "removed") {
                setChannels(prev => prev.filter(channel => {
                    if (channel.id === change.doc.id){
                        return false
                    }
                    return true
                }) );
            }
        });
        });


    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <div className='sidebar_info'>
                    <h2>Clever Programmer</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>

            <SidebarOption Icon={InsertCommentIcon} title={'Threads'} />
            <SidebarOption Icon={InboxIcon} title={'Mentions & reactions'} />
            <SidebarOption Icon={DraftsIcon} title={'Saved items'} />
            <SidebarOption Icon={BookmarkIcon} title={'Channel browser'} />
            <SidebarOption Icon={PeopleAltIcon} title={'People & user groups'} />
            <SidebarOption Icon={AppsIcon} title={'Apps'} />
            <SidebarOption Icon={FileCopyIcon} title={'File browser'} />
            <SidebarOption Icon={ExpandLessIcon} title={'Show Less'} />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title={'Channels'} />
            <hr />
            <SidebarOption Icon={AddCircleIcon} title={'Add Channel'} addChannelOption={true} />

            {channels.map((channel, key) => {return <SidebarOption  title={channel.name} id={channel.id} key={key} />})}



        </div>
    )
}

export default Sidebar