import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import { useState } from "react";
import Sidebar from "./sidebar";
import './MessageModal.css'; // Import your CSS file for styling
import userProfile from '../serviceApi/userprofile';
const socket = io.connect("http://localhost:3001");

function Message(props) {
  const [id, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  // const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  useEffect(()=>{
    fetchUserDate()
  },[])

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        message: message,
        time:new Date(),
        user_id:id
      };

      await socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
    });
  
    return () => {
      // Clean up the socket connection on component unmount
      socket.disconnect();
    };
  }, [socket]);

  const fetchUserDate = async () =>{
    const getAllData = await userProfile.getUserDataByToken();
    setUserId(getAllData?.data?.data[0].id);
  }
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
      <div className="main d-flex w-100 h-100">
        <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
        <div className="mainContent container-fluid">
          
          <ol className="chat">
            
            <div className="day">Hoy</div>
            <li className="self">
              <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false" /></div>
              <div className="msg">
                <p>Te apetece jugar a Minecraft?</p>
                <time>18:03</time>
              </div>
            </li>
            <li className="other">
              <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false" /></div>
              <div className="msg">
                <p>Venga va, hace ya mucho que no juego...</p>
                <time>18:07</time>
              </div>
            </li>
            
          </ol>
          <input className="textarea" type="text" value={message} onChange={handleInputChange} placeholder="Type here!"  onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}/>
          <button type="button" onClick={sendMessage}>Send</button>
          {/* <div className="emojis"></div> */}
        </div>
      </div>
  );
}

export default Message;