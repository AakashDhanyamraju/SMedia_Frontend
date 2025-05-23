import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { SideAndNav } from "../components/SideAndNav";
import axios from "axios";
import useDecodedToken from "../utils/utility";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  const [comments, setComments] = useState([]);
  // const [postId, setPostId] = useState("");
  console.log(comments);
  const [submittedComment, setSubmittedComment] = useState("");
  console.log("submitted Comment", submittedComment);

  const token = Cookies.get("currentUser");
  const decoded = useDecodedToken(token);
  const userInfo = { ...decoded };

  const handleChange = (event) => {
    setSubmittedComment(event.target.value);
  };

  const handleSubmit = async (postId) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/comments/",
        {
          user: userInfo.id,
          post: postId,
          content: submittedComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedComment = response.data;
      toast.success("Comment added");
      // setComments(fetchedComments);
      console.log(response);
    } catch (error) {
      toast.error("failed to add comment");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/posts/api/postswithusername",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  // useEffect(() => {
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedComments = response.data;
      setComments(fetchedComments);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // }, [postId]);

  const postLikes = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const message = response.data;
      // setMessage(message)
      toast.success("Post Liked");
      // alert('post liked')

      // console.log(response)
    } catch (error) {
      toast.warning("You already liked this post!");
      // alert(error)
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:9000/posts', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  //       const fetchedPosts = response.data;

  //       const userIds = fetchedPosts.map(post => post.user);
  //       console.log(userIds)

  //       const usersResponse = await axios.get('http://localhost:9000/users',{
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       }, {
  //         params: {
  //           _id: userIds.join(',')
  //         }
  //       });
  //       const fetchedUsers = usersResponse.data;
  //       console.log(fetchedUsers)
  //       // Combine posts and corresponding usernames into a single array
  //       const combinedData = fetchedPosts.map(post => {
  //         const user = fetchedUsers.find(user => user._id === post.user);
  //         const username = user ? user.username : 'Unknown';

  //         return {
  //           ...post,
  //           username: username
  //         };
  //       });

  //       setPosts(combinedData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        {/* <Navbar /> */}
        <div className="row">
          {/* <div className="col-md-2" >
          <div className="bg-light" style={{ height: '100vh' }}>
            
          </div>
        </div> */}
          <div className="container-sm col-md-10 w-responsive">
            {/* Post Area */}
            <div className="post-area ">
              {/* Render multiple posts */}
              {posts.map((post, index) => (
                <div key={index}>
                  <Post
                    content={post.content}
                    media={post.media[0]}
                    userId={post.user}
                    avatar={post.avatar}
                    likes={post.likes.length - 1}
                    user={post.username}
                    postId={post._id}
                    increaselikes={() => postLikes(post._id)}
                    comments={post.comments}
                  />
                  {/* <form onSubmit={() => handleSubmit(post._id)}> */}
                  {/* <button onClick={() => fetchComments(post._id)}>
                    Comments
                  </button> */}
                  {/* {comments.map((comment, index) => (
                    <div key={index}>{comment.content}</div>
                  ))} */}

                  {/* <label>
                    Comment:
                    <input
                      type="text"
                      value={submittedComment}
                      onChange={handleChange}
                    />
                  </label>
                  <button onClick={() => handleSubmit(post._id)} type="button">
                    Submit
                  </button> */}
                  {/* </form> */}
                </div>
                // <div key={post.id}>{post.title}</div>
              ))}
              {/* Add more posts here */}
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar />
        <div className='container'>
            <Post />

        </div>
        
        <div>home</div> */}
    </Fragment>
  );
};

export default Home;
