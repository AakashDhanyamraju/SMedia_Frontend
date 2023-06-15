import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiTwotoneLike } from "react-icons/ai";

const Post = ({
  likes,
  media,
  content,
  user,
  increaselikes,
  avatar,
  userId,
}) => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://your-api-endpoint/posts');
  //       const fetchedPosts = response.data;
  //       setPosts(fetchedPosts);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const handleLikes = () => {
    try {
      increaselikes();
      // toast.success("post Liked")
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="card mb-3 mt-3">
      <div className="card-header">
        <div className="d-flex align-items-center">
          <div className="rounded-circle object-fit-contain">
            <Link to={`/profile/${userId}`}>
              <img
                src={
                  avatar
                    ? avatar
                    : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                alt="User Avatar"
                className="rounded-circle object-fit-contain border border-2"
                style={{ backgroundSize: "cover" }}
                width="40"
                height="40"
              />
            </Link>
          </div>
          {/* <img className='rounded-circle' height='40px' src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' /> */}
          <h5 className="mb-0 mx-2">{user}</h5>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
        <div className="image-container" style={{ height: "500px" }}>
          <img
            src={media}
            alt="Post Image"
            className="img-fluid object-fit-contain h-100 w-100"
          />
        </div>
      </div>

      <div className="card-footer">
        <button onClick={handleLikes} className="btn btn-primary mr-2 m-1">
          {/* <i className="bi bi-heart-fill mr-1"></i>  */}
          {/* <span uk-icon="heart"></span> */}
          <AiTwotoneLike className="mx-1 mb-1" />
          Like
          <span class="badge badge-danger ms-2">{likes}</span>
        </button>
        {/* <button type="button" class="btn btn-primary position-relative">
          Inbox
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger">
            99+
            <span class="visually-hidden">unread messages</span>
          </span>
        </button> */}
        {/* <button className="btn btn-secondary mr-2 m-1">
          <i className="bi bi-chat-fill mr-1"></i> Comment
        </button> */}
        {/* <button className="btn btn-secondary m-1">
          <i className="bi bi-share-fill mr-1"></i> Share
        </button> */}
      </div>
    </div>
  );
};

export default Post;
