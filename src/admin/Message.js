import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
// import { useState } from "react";
import Sidebar from "./sidebar";
// import './MessageModal.css'; // Import your CSS file for styling
import userProfile from '../serviceApi/userprofile';
// const socket = io.connect("https://filetax.us/");
// const socket = io.connect("http://localhost:9000/");

// ... (existing imports)

function Message(props) {
    const socket = props.socket
    const chatContainerRef = useRef(null);
    // alert(props.id)
    const idRef = useRef(props.id);
    const activeChatUserIdRef = useRef(null);

    const [id, setUserId] = useState(props.id);
    const [user_type, setuser_type] = useState(null);
    const [message, setMessage] = useState('');
    const [completeuserData, setcompleteuserData] = useState([]);
    const [activeChatUserId, setactiveChatUserId] = useState(null);
    const [userIdData, setuserIdData] = useState([]);
    const [showChatMessage, setShowChatMessage] = useState([]);
    const [groupedMessage, setgroupedMessage] = useState([]);

    useEffect(() => {
        fetchUserDate();
        // return () => {
        //     socket.disconnect();
        //   };
    }, []);

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
                user_id: activeChatUserId,
                sender_id: id,
                sender: "admin",
            };

            await socket.emit("send_message", messageData);

            const obj = {
                date: new Date(),
                is_read: 1,
                message: message,
                user_id: activeChatUserId,
                sender_id: id,
                is_read_admin: true,
                is_read_user: false,
            };

            setShowChatMessage((prevShowChatMessage) => {
                const updatedShowChatMessage = [...prevShowChatMessage, obj];
                return updatedShowChatMessage;
            });

            setgroupedMessage((prevGroupedMessage) => {
                const updatedGroupedMessage = { ...prevGroupedMessage };
                if (!updatedGroupedMessage[activeChatUserId]) {
                    updatedGroupedMessage[activeChatUserId] = [];
                }
                updatedGroupedMessage[activeChatUserId].push(obj);
                return updatedGroupedMessage;
            });

            const setMessagess = await userProfile.setMessage(obj);
            setTimeout(() => {
                scrollToBottom();
            }, 0);
            setMessage("");
            setuserIdData((prevuserIdData) => {
                const userIdToMove = activeChatUserId; // Replace with the actual ID you want to move
                const indexToMove = prevuserIdData.findIndex(item => item.id_main === userIdToMove);

                if (indexToMove !== -1) {
                    // Item found, move it to the top
                    const movedItem = prevuserIdData[indexToMove];
                    const updateduserIdData = [
                        movedItem,
                        ...prevuserIdData.slice(0, indexToMove),
                        ...prevuserIdData.slice(indexToMove + 1)
                    ];

                    return updateduserIdData;
                }

                // If the item with the specified ID is not found, return the current array
                return prevuserIdData;
            });
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
            // Use the refs to capture the current values
            // alert()
            console.log('Received message:', data, data.user_id);

            const currentId = idRef.current;
            const currentActiveChatUserId = activeChatUserIdRef.current;
            // alert(props.id)
            if (data.sender_id !== currentId && currentId) {
                console.log('Received message:', data, data.user_id, groupedMessage);

                const obj = {
                    date: new Date(),
                    is_read: 1,
                    message: data.message,
                    user_id: data.user_id,
                    sender_id: data.user_id,
                    is_read_admin: false,
                    is_read_user: false,
                };

                setShowChatMessage((prevShowChatMessage) => {
                    const updatedShowChatMessage = [...prevShowChatMessage];
                    if (currentActiveChatUserId === data.user_id) {
                        updatedShowChatMessage.push(obj);
                    }
                    return updatedShowChatMessage;
                });

                setgroupedMessage((prevGroupedMessage) => {
                    const updatedGroupedMessage = { ...prevGroupedMessage };
                    if (!updatedGroupedMessage[data.user_id]) {

                        setuserIdData((prevuserIdData) => {
                            let userObj = {
                                id_main: data.user_id,
                                firstname: data.firstname,
                                lastname: data.lastname
                            };

                            // Use an array, not an object
                            const updateduserIdData = [...prevuserIdData];

                            let newArray = [userObj, ...updateduserIdData];
                            return newArray;
                        });
                        updatedGroupedMessage[data.user_id] = [];
                    } else {
                        console.log(updatedGroupedMessage)
                        setuserIdData((prevuserIdData) => {
                            const userIdToMove = data.user_id; // Replace with the actual ID you want to move
                            const indexToMove = prevuserIdData.findIndex(item => item.id_main === userIdToMove);

                            if (indexToMove !== -1) {
                                // Item found, move it to the top
                                const movedItem = prevuserIdData[indexToMove];
                                const updateduserIdData = [
                                    movedItem,
                                    ...prevuserIdData.slice(0, indexToMove),
                                    ...prevuserIdData.slice(indexToMove + 1)
                                ];

                                return updateduserIdData;
                            }

                            // If the item with the specified ID is not found, return the current array
                            return prevuserIdData;
                        });
                    }
                    updatedGroupedMessage[data.user_id].push(obj);
                    return updatedGroupedMessage;
                });

                setTimeout(() => {
                    scrollToBottom();
                }, 0);
            }
        });

        // return () => {
        //     socket.disconnect();
        //   };
    }, [socket,idRef.current]);

    useEffect(() => {
        // Update the refs when the corresponding state values change
        idRef.current = props.id;
        activeChatUserIdRef.current = activeChatUserId;
    }, [props.id, activeChatUserId]);

    useEffect(() => {
        scrollToBottom();
        console.log("userIdData", userIdData);
    }, [showChatMessage, userIdData]);

    useEffect(() => {
        console.log("groupedMessage-->", groupedMessage)
    }, [groupedMessage]);


    const fetchUserDate = async () => {
        const getAllData = await userProfile.getUserDataByToken();
        setUserId(getAllData?.data?.data[0]?.id);
        setuser_type(getAllData?.data?.data[0]?.user_type);
        if (getAllData?.data?.data[0]?.user_type !== 1) {
            const getMessage = await userProfile.getMessage();
            setShowChatMessage(getMessage?.data?.data ? getMessage?.data?.data : []);
        } else {
            const getMessage = await userProfile.getAllMessage();
            const dat = getMessage?.data?.data;
            console.log("getMessage-->", getMessage?.data?.data);
            const inArr = [];
            const userArr = [];
            const groupedMessages = dat.reduce((acc, message) => {
                const senderId = message.user_id;

                if (!acc[senderId]) {
                    acc[senderId] = [];
                }
                acc[senderId].push(message);

                if (!inArr.includes(senderId) && senderId !== getAllData?.data?.data[0]?.id) {
                    userArr.push(message);
                    inArr.push(senderId);
                }
                return acc;
            }, {});
            const sortedArray = userArr.sort((a, b) => new Date(b.date) - new Date(a.date));

            console.log("userArr-->", userArr);
            setuserIdData(sortedArray);
            setgroupedMessage(groupedMessages);
            console.log("groupedMessages", groupedMessages);
        }

        scrollToBottom();
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <>
            <div className="main d-flex w-100 h-100">
                <Sidebar
                    firstLoad={props.firstLoad}
                    setfirstLoad={props.setfirstLoad}
                    completeuserData={completeuserData}
                    setfilterStatus={props.setfilterStatus}
                    filterStatus={props.filterStatus}
                    isLoggedIn={props.isLoggedIn}
                    setisLoggedIn={props.setisLoggedIn}
                />
                <div className="mainContent container-fluid">
                    <div className="outerChat">
                        {user_type === 1 ? (
                            <div className="chatProfile">
                                {userIdData.length ?
                                    userIdData.map((user, index) => (
                                        <a
                                            style={{ cursor: "pointer" }}
                                            className={activeChatUserId === user.id_main ? "activeChat" : ""}
                                            key={index}
                                            onClick={() => {
                                                setactiveChatUserId(user.id_main);
                                                setShowChatMessage(groupedMessage[user.id_main]);
                                            }}
                                        >
                                            <img src="images/dummyImage.jpg" alt={`Avatar for ${user.firstname} ${user.lastname}`} />
                                            <div>
                                                <h6>{user.firstname} {user.lastname}</h6>
                                            </div>
                                        </a>
                                    ))
                                    : <div class="message-container">
                                        <p>Client hasn't sent you a message as of now.</p>
                                    </div>}
                            </div>
                        ) : null}
                        {activeChatUserId ? (
                            <div className="chat">
                                <ol className="outer_chat">
                                    {showChatMessage.length ?
                                        showChatMessage.map((chat, index) => (
                                            <li key={index} className={chat.sender_id === id ? "self" : "other"}>
                                                <div className="avatar">
                                                    <img src="images/dummyImage.jpg" alt="User Avatar" draggable="false" />
                                                </div>
                                                <div className="msg" style={{ border: "1px solid black" }}>
                                                    <p>{chat.message}</p>
                                                    <time>{new Date(chat.date).toLocaleString()}</time>
                                                </div>
                                            </li>
                                        ))
                                        : userIdData.length ? (<div class="message-container">
                                            <p>Select chat to show Messages.</p>
                                        </div>) : ""}
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
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;


// export default Message;
