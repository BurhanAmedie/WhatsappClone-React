import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import MicIcon from "@material-ui/icons/Mic"
import { useParams } from "react-router-dom"
import db from './firebase'
import firebase from "firebase"
import { useStateValue } from './StateProvider'
function Chatbox() {

    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [seed, setseed] = useState("");
    const [messages, setmessages] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
        
    }, [])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(
               snapshot =>  {
                   setRoomName(snapshot.data().name)
               }
            )
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => setmessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [roomId])


    const sendMessage= (e) => {
        e.preventDefault();
        console.log("you typed >>>" + input)

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });


        setInput("");
    }
    

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{ roomName}</h3>
                    <p>Last seen{" "} { new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()} </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className= {`chat__messages ${message.name === user.displayName && "chat__reciever"}`} >
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>

                ))}
                    
            </div>
            <div  className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value ={input} onChange= {(e) => setInput(e.target.value)}  placeholder="Type a message"  type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message </button>
                </form>
                <MicIcon />  
            </div>
        </div>
    )
}

export default Chatbox