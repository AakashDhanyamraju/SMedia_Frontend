import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiTwotoneLike } from "react-icons/ai";
import Cookies from "js-cookie";
import useDecodedToken from "../utils/utility";
import axios from "axios";

const Post = ({
  likes,
  media,
  content,
  user,
  increaselikes,
  avatar,
  userId,
  comments,
  postId,
}) => {
  const [submittedComment, setSubmittedComment] = useState("");
  console.log("submitted Comment", submittedComment);

  const token = Cookies.get("currentUser");
  const decoded = useDecodedToken(token);
  const userInfo = { ...decoded };
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
          Likes
          <span class="badge badge-danger ms-2">{likes}</span>
        </button>

        {comments &&
          comments.map((comment, index) => (
            <div>
              <ul class="list-unstyled mb-0">
                <li class="p-2 border-bottom">
                  <a class="d-flex justify-content-between">
                    <div class="d-flex flex-row">
                      <div>
                        <img
                          src={
                            comment.avatar
                              ? comment.avatar
                              : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          }
                          className="rounded-circle object-fit-contain d-flex align-self-center me-3 border border-2"
                          style={{ backgroundSize: "cover" }}
                          width="60"
                          height="60"
                          alt="avatar"
                          // class="d-flex align-self-center me-3"
                          // width="60"
                        />
                      </div>
                      <div class="pt-1">
                        <p class="fw-bold mb-0">{comment.username}</p>
                        <p class="small text-muted">{comment.content}</p>
                      </div>
                    </div>
                    <div class="pt-1">
                      <p class="small text-muted mb-1">{comment.created_at}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          ))}
        <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
          <input
            value={submittedComment}
            onChange={handleChange}
            type="text"
            class="form-control form-control-lg"
            id="exampleFormControlInput2"
            placeholder="Type message"
          />

          <a class="ms-3" onClick={() => handleSubmit(postId)}>
            <i class="fas fa-paper-plane"></i>
          </a>
        </div>

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
