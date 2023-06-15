import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import useDecodedToken from "../utils/utility";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { format } from "date-fns";

// import ''

const ChatSection = () => {
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderData, setSenderData] = useState([]);
  const [receiverData, setReceiverData] = useState([]);
  const [arrivingMessage, setArrivingMessage] = useState(null);
  const inputRef = useRef();

  console.log("arriving message", arrivingMessage);
  console.log("receiverData", receiverData);
  // const [socket, setSocket] = useState(null)
  const socket = useRef();

  console.log(messages);
  const token = Cookies.get("currentUser");
  const decodedToken = useDecodedToken(token);
  const userInfo = { ...decodedToken };
  const id = userInfo.id;

  // useEffect(() => {
  //   scrollRef && scrollRef.current.scrollIntoView({behaviour: 'smooth'})

  // },[content])

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  // useEffect(() => {
  //   setTimeout(() => scrollRef.current.scrollIntoView({ behavior: 'smooth' }), 1000);
  // },[content]);

  // console.log(decodedToken)
  // const decodedToken = useDecodedToken(token)
  // console.log('messages', messages);
  // console.log(userInfo.id);
  // console.log('conversations',conversations);

  // console.log(conversations)

  // console.log(id);

  // useEffect(() => {
  // // console.log(decodedToken)
  //   const userInfo = {...decodedToken}
  //   console.log(userInfo.id)
  //   const id = userInfo.id
  //   axios.get(`http://localhost:9000/conversations/${id}`,{
  //       headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //   })
  //     .then(response =>{console.log(response.data); setConversations(response.data)})
  //     .catch(error => console.error(error));

  // },[])

  // const date = new Date(dateString);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // const formattedTime = date.toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  // });

  useEffect(() => {
    const setArriveMessages = () => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        console.log("data", data);
        setArrivingMessage({
          sender: data.senderId,
          content: data.text,
          timestamp: Date.now(),
        });
      });
    };
    setArriveMessages();
  }, []);

  useEffect(() => {
    const messagesArrive = () => {
      arrivingMessage &&
        receiverData._id === arrivingMessage.sender &&
        setMessages((prev) => [...prev, arrivingMessage]);
    };
    messagesArrive();
  }, [arrivingMessage]);

  useEffect(() => {
    {
      id && socket.current.emit("addUser", id);
    }
    socket.current.on("getUsers", (users) => {
      console.log("users", users);
    });
  }, [id]);

  // useEffect(() => {
  //   socket?.on("welcome", message => {
  //     console.log(message)
  //   })
  // },[socket])
  // useEffect(() => {
  //   const handleWelcomeMessage = (message) => {
  //     console.log(message);
  //   };

  //   {socket && socket.on("welcome", handleWelcomeMessage);}

  //   // Cleanup function
  //   return () => {
  //     {socket && socket.off("welcome", handleWelcomeMessage);}
  //   };
  // }, [socket]);

  const handleCreateMessage = async (e) => {
    console.log("sendMessaeg", {
      senderId: id,
      receiverId: receiverData._id,
      text: content,
    });
    // e.preventDefault();
    const sender = id;

    // socket.current.emit('sendMessage', {
    //   senderId: id,
    //   receiverId: receiverData._id,
    //   text: content
    // })

    try {
      inputRef.current.value = "";

      inputRef.current.focus();

      if (!conversationId) {
        return toast.error("no conversation Id");
      }
      if (!sender) {
        return toast.error("no sender Id");
      }
      if (!content) {
        return toast.warning("Message cannot be blank");
      }
      socket.current.emit("sendMessage", {
        senderId: id,
        receiverId: receiverData._id,
        text: content,
      });
      const response = await axios.post(
        "http://localhost:9000/messages",
        {
          conversationId,
          sender,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setContent(null);
      // Focus the input
      console.log(response.data);
      // Handle success
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
      // Handle error
    }
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     handleCreateMessage(event);
  //     // fetchMessages(conversationId)
  //   }
  // };

  //  conversationId && useEffect(async () => {
  //     const fetchMessages = async (conversationId) => {

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:9000/messages/${conversationId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // console.log(response.data);
  //       setConversationId(conversationId);
  //       setMessages(response.data);
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(err.response.data.error);
  //     }}

  //     fetchMessages(conversationId)

  // },[conversationId])
  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setConversationId(conversationId);
      setMessages(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/conversations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setConversations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  }, [id, token]);

  return (
    <div>
      <section style={{}}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card" id="chat3" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                      <div className="p-3">
                        <div className="input-group rounded mb-3">
                          <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                          />
                          <span
                            className="input-group-text border-0"
                            id="search-addon"
                          >
                            <i className="fas fa-search"></i>
                          </span>
                        </div>
                        <div
                          data-mdb-perfect-scrollbar="true"
                          // style={{ position: "relative", height: "400px" }}
                          style={{
                            position: "relative",
                            height: "400px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                          }}
                        >
                          <ul className="list-unstyled mb-0">
                            {/* this is users */}
                            {/* {friendRequests.map(request => ( */}
                            {conversations.map((conversation, index) => (
                              <li key={index} className="p-2 border-bottom">
                                <a
                                  onClick={() => {
                                    // setConversationId(conversation._id)
                                    setReceiverData(conversation.userData);
                                    fetchMessages(conversation._id);
                                  }}
                                  className="d-flex justify-content-between"
                                >
                                  <div className="d-flex flex-row">
                                    <div>
                                      <a
                                        href={`/profile/${conversation.userData._id}`}
                                      >
                                        <img
                                          src={
                                            conversation.userData.avatar
                                              ? conversation.userData.avatar
                                              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                          }
                                          alt="avatar"
                                          className="d-flex align-self-center me-3 rounded-circle object-fit-contain border border-1"
                                          height="60"
                                          width="60"
                                        />
                                        <span
                                          className={`${
                                            conversation.userData.status ===
                                            "active"
                                              ? "badge bg-success  badge-dot"
                                              : "badge bg-danger badge-dot"
                                          } `}
                                        ></span>
                                      </a>
                                    </div>
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0">
                                        {conversation.userData.username}
                                      </p>
                                      {/* <p className="small text-muted">Hello, Are you there?</p> */}
                                    </div>
                                  </div>
                                  <div className="pt-1">
                                    {/* <p className="small text-muted mb-1">Just now</p> */}
                                    {/* <span className="badge bg-danger rounded-pill float-end">3</span> */}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {conversationId && (
                      <div className="col-md-6 col-lg-7 col-xl-8">
                        {/* this is chats */}

                        <div
                          className="pt-3 pe-3"
                          data-mdb-perfect-scrollbar="true"
                          // style={{ position: "relative", height: "400px" }}
                          style={{
                            position: "relative",
                            height: "400px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {/* incoming chat */}
                          {messages.map((message, index) => (
                            <div ref={messagesEndRef}>
                              {message.sender === id ? (
                                <div className="d-flex flex-row justify-content-end">
                                  <div>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                      {/* Ut enim ad minim veniam, quis nostrud
                                      exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat. */}
                                      {message.content}
                                    </p>
                                    <p className="small me-3 mb-3 rounded-3 text-muted">
                                      {/* 12:00 PM | Aug 13 */}
                                      {message.timestamp}
                                    </p>
                                  </div>
                                  <img
                                    className="rounded-circle object-fit-contain border border-1"
                                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    src={
                                      message.senderData.avatar
                                        ? message.senderData.avatar
                                        : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                    }
                                    alt="avatar 1"
                                    width="45px"
                                    height="45px"
                                    // style={{ width: "45px", height: "100%" }}
                                  />
                                </div>
                              ) : (
                                <div className="d-flex flex-row justify-content-start">
                                  <img
                                    className="rounded-circle object-fit-contain border border-1"
                                    src={
                                      receiverData.avatar
                                        ? receiverData.avatar
                                        : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                    }
                                    // "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 1"
                                    width="45px"
                                    height="45px"
                                    // style={{ width: "45px", height: "100%" }}
                                  />
                                  <div>
                                    <p
                                      className="small p-2 ms-3 mb-1 rounded-3"
                                      style={{ backgroundColor: "#f5f6f7" }}
                                    >
                                      {/* Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit, sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. */}
                                      {message.content}
                                    </p>
                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                      {/* 12:00 PM | Aug 13 */}
                                      {/* {message.timestamp} */}
                                      {formattedDate(message.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {/* outgoing chat */}
                        </div>

                        {/* this is input */}

                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                          {/* <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 3"
                            style={{ width: "40px", height: "100%" }}
                          /> */}
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput2"
                            placeholder="Type message"
                            value={content}
                            // onKeyDown={handleKeyDown}
                            onChange={(e) => setContent(e.target.value)}
                            ref={inputRef}
                          />
                          <a className="ms-1 text-muted" href="#!">
                            <i className="fas fa-paperclip"></i>
                          </a>
                          <a className="ms-3 text-muted" href="#!">
                            <i className="fas fa-smile"></i>
                          </a>
                          <a
                            onClick={(e) => {
                              handleCreateMessage(e);
                              fetchMessages(conversationId);
                            }}
                            className="ms-3"
                            href="#!"
                          >
                            <i className="fas fa-paper-plane"></i>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatSection;
