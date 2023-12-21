import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
// import { useState } from "react";
import Sidebar from "./sidebar";
import './MessageModal.css'; // Import your CSS file for styling
import userProfile from '../serviceApi/userprofile';
const socket = io.connect("http://195.35.45.11:3001/");

function Message(props) {
  const chatContainerRef = useRef(null);

  const [id, setUserId] = useState(props?.id);
  const [message, setMessage] = useState('');
  // const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [userData,setUserDate] = useState([])
  const [showChatMessage, setShowChatMessage] = useState([]);

  useEffect(() => {
    fetchUserDate()
  }, [])

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        message: message,
        time: new Date(),
        user_id: id,
        sender_id: id,
        firstname:userData.firstname,
        lastname:userData.lastname
      };

      await socket.emit("send_message", messageData);
      const chat =JSON.parse(JSON.stringify( showChatMessage))
      const obj = {
        date: new Date(),
        is_read: 1,
        message: message,
        user_id: id,
        sender_id: id,
        is_read_admin: false,
        is_read_user: true,
        firstname:userData.firstname,
        lastname:userData.lastname
      }
      chat.push(obj)
      setShowChatMessage(chat);
      const setMessagess = await userProfile.setMessage(obj);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
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
      const obj = {
        date: new Date(),
        is_read: 1,
        message: data.message,
        user_id: data.user_id,
        sender_id: data.sender_id,
        is_read_admin: false,
        is_read_user: true,
      };
      if(data.sender_id != data.user_id && data.user_id === id){
        // alert(id)
        setShowChatMessage(prevState => [...prevState, obj]);
      }
      // Update the state using the functional form of setState to ensure correct updates
    });

    return () => {
      // Clean up the socket connection on component unmount
      socket.disconnect();
    };
  }, [socket,id]);

  useEffect(() => {
    scrollToBottom();
  }, [showChatMessage]);

  const fetchUserDate = async () => {
    const getAllData = await userProfile.getUserDataByToken();
    setUserId(getAllData?.data?.data[0]?.id);
    setUserDate(getAllData?.data?.data[0])
// alert(getAllData?.data?.data[0]?.id)
    const getMessage = await userProfile.getMessage();
    setShowChatMessage(getMessage?.data?.data ? getMessage?.data?.data : [])
    console.log("getMessage?.data", getMessage?.data?.data)
    // setUserId(getAllData?.data?.data[0].id);
    scrollToBottom()

  }
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="main d-flex w-100 h-100">
      <Sidebar isLoggedIn={props.isLoggedIn} setisLoggedIn={props.setisLoggedIn} />
      <div className="mainContent container-fluid">
        <div className="outerChat">
          <div className="chat">
            {/* <div className="day">Hoy</div> */}
            <ol className="outer_chat">
              {showChatMessage.map((chat, index) => (
                <li key={index} className={chat.sender_id === id ? "self" : "other"}>
                  <div className="avatar"><img src="images/dummyImage.jpg" alt="User Avatar" draggable="false" /></div>
                  <div className="msg" style={{ border: "1px solid black" }}>
                    <p>{chat.message}</p>
                    <time>{new Date(chat.date).toLocaleString()}</time>
                  </div>
                </li>
              ))}
              <div ref={chatContainerRef}></div>

            </ol>
            <div className="typeMessage">
              <input
                className="textarea"
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Type here!"
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button type="button" className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;