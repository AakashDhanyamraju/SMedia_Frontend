import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import useDecodedToken from '../utils/utility';
import { toast } from 'react-toastify';

const Profile = () => {
    const [profile, setProfile] = useState([])
    const [posts, setPosts] = useState([])
    const [friends, setFriends] = useState([])
    console.log(posts)
    const { id } = useParams()
    const token = Cookies.get("currentUser")

    
    const decoded = useDecodedToken(token)
    const userInfo = {...decoded}
    const currId = userInfo.id

    var canUpdate = false
    console.log(userInfo.id)
    
    if(userInfo.id === id){
        // console.log('can update his profile')
        canUpdate = true
    }

    const handleCreateConversation = (id) => {
      axios.post('http://localhost:9000/conversations', [currId, id], {
          headers: {
              'Authorization': `Bearer ${token}`
            }
      })
        .then(response => {
          toast.success("Conversation Created")
          console.log(response.data)
  
          // setUser(response.data)
      })
        .catch(error => {
          toast.error(error.response.data.error); console.error(error)});

    };
    
    useEffect(() => {

        axios.get(`http://localhost:9000/users/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));

      axios.get(`http://localhost:9000/posts/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));


      axios.get(`http://localhost:9000/friends/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    })
      .then(response => setFriends(response.data))
      .catch(error => console.error(error));

    },[id])
    
  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={profile.avatar ? profile.avatar : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} />
            <Card.Body>
              <Card.Title>{profile.username}</Card.Title>
              <Card.Text>
                {profile.email}
                <br />
                 
                {profile.name ? profile.name : 'User Choose not to display his name'  }
                <br />
                {profile.bio}
                {/* Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. */}
              </Card.Text>
              {canUpdate ? <Button variant="primary">Edit Profile</Button> : ''}
              
            </Card.Body>
          </Card>

          <Card className='mt-3'>
            <Card.Body>
              <Card.Title>Friends</Card.Title>
              <Card.Text>
                {friends && friends.map((friend, index) => (
                  <div className='d-flex justify-content-between mt-4' key={index}>
                    <div className='d-flex text-center'>
                      <img className='rounded-circle' height='40px' src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' />
                      <h6 className='mt-2 mx-2'>{friend.username}</h6>
                    </div>
                    {canUpdate && 
                    <div>
                    { friend.receiverId === currId ? <Button size='sm' className='' variant="primary" onClick={() => handleCreateConversation(friend.senderId)}>Message</Button> : <Button  variant="primary" size='sm' onClick={() => handleCreateConversation(friend.receiverId)}>Message</Button> }

                    </div>}
                    

                  </div>
                ))}
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>About Me</Card.Title>
              <Card.Text className='mt-3'>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices, erat eget ultrices
                sollicitudin, sapien mauris pulvinar lorem, eget vestibulum est neque eu orci. Nullam pharetra vel
                metus a consectetur. Phasellus et metus vitae sapien fringilla fringilla non nec risus. Sed interdum
                consequat tellus at ullamcorper. */}
                {profile.aboutme ? profile.aboutme : 'This user is lazy!'}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Body>
              <Card.Title>My Posts</Card.Title>
              <Card.Text>
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices, erat eget ultrices
                sollicitudin, sapien mauris pulvinar lorem, eget vestibulum est neque eu orci. Nullam pharetra vel
                metus a consectetur. Phasellus et metus vitae sapien fringilla fringilla non nec risus. Sed interdum
                consequat tellus at ullamcorper. */}
                {profile.aboutme}
              </Card.Text>
            </Card.Body>
          </Card>
          {posts && posts.map( (post, index) => (

          //   <Card className='mt-3' key={index}>
          //     <Card.Img>
          //       <img src={post.media} />
          //     </Card.Img>
          //     <Card.Header>{post.username}</Card.Header>
          //   <Card.Body>
          //     <Card.Title>{post.title}</Card.Title>
              
          //   </Card.Body>
          // </Card>
          <Card className='mt-3' style={{ }}>
            <Card.Img variant="top" src={post.media} />
            {/* <Card.Header>
              <div className='d-flex'>
                <img alt="User Avatar"
              className="rounded-circle object-fit-contain border border-2" style={{backgroundSize: 'cover', }}
              width="40"
              height='40' src={post.avatar ? post.avatar : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'} />
                <p className='mt-2 mx-1'><h6>{post.username}</h6></p>
                </div>
                </Card.Header> */}

            <Card.Body>
              <Card.Title>{post.content}</Card.Title>
              {/* <Card.Text>
                {post.username}
              </Card.Text> */}
              {/* <Button className='mt-3' variant="primary">Likes</Button> */}
              <button className="btn btn-primary mr-2 m-1">
                <i className="bi bi-heart-fill mr-1"></i>Likes
                <span class="badge badge-danger ms-2">{post.likes.length - 1 }</span>
              </button>
            </Card.Body>
          </Card>

          ))}

          

        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
