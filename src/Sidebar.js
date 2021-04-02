import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from "@material-ui/icons"
import SidebarChat from './SidebarChat.js';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch]= useStateValue();


    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
        setRooms(
            snapshot.docs.map((doc) => (
                {
                id: doc.id,
                data: doc.data(),
            }
            ))
        )
        )
        return () => {
            unsubscribe()
        }
    }, []);
    return (
        <div className= "sidebar">
            <div className="sidebar__header">
            <Avatar src = {user?.photoURL} />
                <dic className= "sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </dic>
            </div> 
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new Chat"
                    type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                    <SidebarChat addNewChat />
                    {rooms.map( room => (
                        <SidebarChat key={room.name} 
                        id= {room.id}  name= { room.data.name}/>

                    ))}
                    
                    
                    
            </div>
        </div>
    )
}

export default Sidebar