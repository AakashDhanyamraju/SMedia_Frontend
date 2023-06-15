import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useDecodedToken, { infoModal, showAlert } from "../utils/utility";
import { decode } from "jsonwebtoken";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { toast } from "react-toastify";

const Friends = () => {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  console.log(friends);
  const token = Cookies.get("currentUser");

  const decoded = useDecodedToken(token);
  const userInfo = { ...decoded };
  const currId = userInfo.id;

  useEffect(() => {
    // Fetch friend requests
    axios
      .get("http://localhost:9000/friends/friend-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFriendRequests(response.data))
      .catch((error) => console.error(error));

    // Fetch sent requests
    axios
      .get("http://localhost:9000/friends/sent-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setSentRequests(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:9000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAllUsers(response.data))
      .catch((error) => console.error(error));

    // Fetch friends
    axios
      .get("http://localhost:9000/friends/allfriends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFriends(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSendRequest = (receiverId) => {
    axios
      .post(
        "http://localhost:9000/friends/send-request",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // alert(response.data.message)
        // showAlert()
        // Alert(response.data.message)
        toast.success(response.data.message);

        // console.log(response.data)
      })
      .catch((error) => {
        // Alert( error.response.data.error)
        toast.error(error.response.data.error);

        // alert(error.response.data.error)
        console.error(error);
      });
  };

  const handleAcceptRequest = (requestId) => {
    axios
      .put(
        `http://localhost:9000/friends/accept-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        toast.warn(error.response.data.error);
        console.error(error);
      });
  };

  const handleRejectRequest = (requestId) => {
    axios
      .put(
        `http://localhost:9000/friends/reject-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  const handleGetUser = (id) => {
    axios
      .get(
        `http://localhost:9000/users/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleCreateConversation = (id) => {
    axios
      .post("http://localhost:9000/conversations", [currId, id], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Conversation Created");
        console.log(response.data);

        // setUser(response.data)
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.error(error);
      });
  };

  return (
    <div>
      <h2 className="text-center mt-4 mb-5">Friend Requests</h2>
      <ul>
        {friendRequests.map((request) => (
          // <li key={request._id}>
          //   {request.senderId} has sent you a friend request
          //   <button onClick={() => handleAcceptRequest(request._id)}>Accept</button>
          //   <button onClick={() => handleRejectRequest(request._id)}>Reject</button>
          // </li>

          <Col md={4} className="mb-4">
            <Card>
              {/* <Card.Img variant="top" className='img-thumbnail' src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' /> */}
              <Card.Body className="d-flex justify-content-between">
                <div className="d-flex text-center">
                  <img
                    className="rounded-circle"
                    height="40px"
                    src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  />
                  <Card.Title className="mt-2 mx-2">
                    {request.username}
                  </Card.Title>
                </div>

                <div className="d-flex">
                  <Button
                    className="m-1"
                    onClick={() => handleAcceptRequest(request._id)}
                    variant="primary"
                  >
                    Approve
                  </Button>
                  <Button
                    className="m-1"
                    onClick={() => handleRejectRequest(request._id)}
                    variant="danger"
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </ul>

      <h2 className="text-center mt-4 mb-5">Sent Requests</h2>
      <ul>
        {sentRequests.map((request) => (
          <li key={request._id}>
            You have sent a friend request to {request.receiverId}
          </li>
        ))}
      </ul>

      <h2 className="text-center mt-4 mb-5">Friends</h2>
      <Row>
        {friends.map((friend) => (
          // <li key={friend._id}>{friend.username} is your friend</li>
          <Col md={4} className="mb-4">
            <Card>
              {/* <Card.Img variant="top" className='img-thumbnail' src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' /> */}
              <Card.Body className="d-flex justify-content-between">
                <div className="d-flex text-center">
                  <img
                    className="rounded-circle"
                    height="40px"
                    src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  />
                  <Card.Title className="mt-2 mx-2">
                    {friend.username}
                  </Card.Title>
                </div>
                {friend.receiverId === currId ? (
                  <Button
                    variant="primary"
                    onClick={() => handleCreateConversation(friend.senderId)}
                  >
                    Message
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleCreateConversation(friend.receiverId)}
                  >
                    Message
                  </Button>
                )}

                {/* <Button  variant="primary" onClick={() => handleCreateConversation()}>Message</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <h2>Add Friend</h2> */}
      <div></div>

      <div>
        <h1 className="text-center mt-4 mb-5">All Users</h1>

        {/* <h2>All Users</h2> */}
        <Row>
          {allUsers
            .filter((user) => user._id.toString() !== userInfo.id.toString())
            .map((user) => (
              // <div className='card d-flex' >
              //     <p>{user.username}</p>
              //     <button onClick={() => handleSendRequest(user._id)}>Send Friend Request</button>
              // </div>

              <Col md={4} className="mb-4">
                <Card>
                  {/* <Card.Img variant="top" className='img-thumbnail' src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' /> */}
                  <Card.Body className="d-flex justify-content-between">
                    <div className="d-flex text-center">
                      <img
                        className="rounded-circle"
                        height="40px"
                        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                      />
                      <Card.Title className="mt-2 mx-2">
                        {user.username}
                      </Card.Title>
                    </div>
                    {/* <Card.Text>
                      {user.mutualFriends} mutual friends
                    </Card.Text> */}
                    <Button
                      onClick={() => handleSendRequest(user._id)}
                      variant="primary"
                    >
                      Add Friend
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      {/* <button onClick={() => handleSendRequest()}>Send Friend Request</button> */}
    </div>
  );
};

export default Friends;
