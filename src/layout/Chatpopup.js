import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import './MessageModal.css'; // Import your CSS file for styling
import userProfile from '../serviceApi/userprofile';
// const socket = io.connect("https://filetax.us/");
// const socket = io.connect("https://filetax.us/", {
//   reconnection: true,
//   reconnectionDelay: 1000, // 1 second delay between each attempt
//   reconnectionAttempts: Infinity, // Infinite attempts
// });
const Chatpopup = (props) => {
    const socket = props.socket
    const chatContainerRef = useRef(null);
    const idRef = useRef(props?.id);

    const [id, setUserId] = useState();
    const [message, setMessage] = useState('');
    // const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [userData, setUserDate] = useState([])
    const [showChatMessage, setShowChatMessage] = useState([]);

    useEffect(() => {
        fetchUserDate()
        // return () => {
        //     socket.disconnect();
        //   };
    }, [])

    useEffect(() => {
        if (props.showChat) {
            const messageChange = JSON.parse(JSON.stringify(showChatMessage));
            const updatedMessages = messageChange.map(message => ({
                ...message,
                is_read_user: 1
            }));
        
            setShowChatMessage(updatedMessages);
            props.setnotificationCount(0)

        }
    }, [props.showChat])
    useEffect(() => {
        // Update the refs when the corresponding state values change
        idRef.current = props.id;
        // alert(props.id)
    }, [props.id, props.showChat]);


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
                firstname: userData.firstname,
                lastname: userData.lastname
            };

            await props.socket.emit("send_message", messageData);
            const obj = {
                date: new Date(),
                is_read: 1,
                message: message,
                user_id: id,
                sender_id: id,
                is_read_admin: false,
                is_read_user: true,
                firstname: userData.firstname,
                lastname: userData.lastname
            };

            // Use the functional form of setState to ensure correct updates
            setShowChatMessage(prevMessages => [...prevMessages, obj]);
            const setMessagess = await userProfile.setMessage(obj);
            setTimeout(() => {
                scrollToBottom();
            }, 0);
            setMessage("");
        }
    };

    useEffect(() => {
        console.log("props.socket",socket)
        props.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        props.socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        props.socket.on('receive_message', (data) => {
            console.log('Received message:', data);

            const currentId = idRef.current;
            console.log('Received message:', data, data.user_id, props);

            // Check if the message is for the current user
            // alert(id)
            if (data.user_id === currentId && data.user_id !== data.sender_id) {
                // alert()
                // Update the state using the functional form of setState
                setShowChatMessage((prevMessages) => {
                    const obj = {
                        date: new Date(),
                        is_read: 1,
                        message: data.message,
                        user_id: data.user_id,
                        sender_id: data.sender_id,
                        is_read_admin: false,
                        is_read_user: true,
                    };
                    if (!props.showChat) {
                        obj.is_read_user = false
                    }
                    // Use the spread operator to create a new array with the new message
                    return [...prevMessages, obj];
                });
            }
        });


        // return () => {
        //     props.socket.disconnect();
        //   };
    }, [props.socket]);

    useEffect(() => {
        scrollToBottom();
        const unreadMessages = showChatMessage.filter(message => !message.is_read_user);
        props.setnotificationCount(unreadMessages.length ? 1 : 0)
        console.log("showChatMessage-->", showChatMessage)
    }, [showChatMessage, props.showChat]);

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
        <div class="chatbox-holder">
            <div class="chatbox">
                <div class="chatbox-top">

                    <div class="chat-partner-name">
                        <span class="status online"></span>
                        <a >Filetax Support</a>
                    </div>
                    <div class="chatbox-icons">
                        <a href="javascript:void(0);"><i class="fa fa-minus"></i></a>
                        <a href="javascript:void(0);"><i class="fa fa-close"></i></a>
                    </div>
                </div>
                <div class="chat-messages">
                    {
                        showChatMessage.length ?
                            showChatMessage.map((chat, index) => (
                                // chat.sender_id === id ? "self" : "other"

                                chat.sender_id === id ? (< div class="message-box-holder" >
                                    <div class="message-box">
                                        {chat.message}
                                    </div>
                                </div>) : < div class="message-box-holder" >
                                    <div class="message-sender">
                                        Support
                                    </div>
                                    <div class="message-box message-partner">
                                        {chat.message}.
                                    </div>
                                </div>
                            ))
                            : ""}
                    <div ref={chatContainerRef}></div>

                </div>

                <div class="chat-input-holder">
                    <textarea class="chat-input" onChange={handleInputChange}
                        placeholder="Type here!"
                        value={message}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}></textarea>
                    <input type="submit" value="Send" class="message-send" onClick={sendMessage} />
                </div>
                <button type="button" className="btn cancel" onClick={() => {
                    props.setshowChat(false)
                }}>Close</button>
            </div>

        </div >
    )
}
export default Chatpopup