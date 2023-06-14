import Cookies from 'js-cookie';
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import useDecodedToken from '../utils/utility';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('');
    const token = Cookies.get('currentUser')
    const decodedToken = useDecodedToken(token)
    console.log(decodedToken)

  const [media, setMedia] = useState('');
  console.log(media)
//   const [Content, setContent] = useState('');

  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setMedia(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

    // const handleImageUpload = (event) => {
    //     const files = event.target.files;
    //     const uploadedMedia = [];

    //     for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         const base64String = reader.result;
    //         uploadedMedia.push(base64String);

    //         // Set the media state after all files have been processed
    //         if (uploadedMedia.length === files.length) {
    //         setMedia(uploadedMedia);
    //         }
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    //     }
    // };


  const handleCreatePost = async (e) => {
    e.preventDefault();
    const userId = decodedToken.id

    if(!userId){
      return toast.warning("userId is missing")
    }
    if(!content){
      return toast.warning("Show some creativity...")
    }
    if(!media){
      return toast.warning("Add a image")
    }

    const createdPost = {
        user: userId,
        content: content,
        media: media,
    }
    // console.log(createdUser)
    try {
      const response = await axios.post('http://localhost:9000/posts', createdPost,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Post Added Successfully')

      // setMessage('Post added successfully');
      window.location.href = '/'
    } catch (error) {
    //   console.log(error)
      console.log(error)
      toast.error(`failed due to this error: ${error}`)
      // Handle registration errors
      setMessage(`failed due to this error: ${error}`);
    }
  };

  return (
    <div className="container">
      <h1>Create a Post</h1>
      <form onSubmit={handleCreatePost}>
        {/* <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div> */}
        <div className="form-group">
          {/* <label htmlFor="media">media</label> */}
          <div>
              <div class="mb-4 d-flex justify-content-center">
                  <img src={media ? media : 'https://placehold.co/600x400'}
                  alt="example placeholder" style={{width:'25%'}} />
              </div>
              <div class="d-flex justify-content-center">
                  <div class="btn btn-primary btn-rounded">
                      <label class="form-label text-white m-1" for="customFile1">Choose file</label>
                      <input type="file" class="form-control d-none" accept='image/*' onChange={handleImageUpload} required id="customFile1" />
                  </div>
              </div>
          </div>
          {/* <input
            type="file"
            className="form-control"
            id="media"
            accept='image/*'
            onChange={handleImageUpload}
            required
            multiple
          /> */}
           {/* <div id="carouselExample" class="carousel slide"> */}
                {/* <div class="carousel-inner"> */}
                {/* {media.map((base64String, index) => (
                     <div class="carousel-item" key={index}>
                        {media && <img height='100px' width='auto' class="d-block w-100 img-thumbnail" src={media} alt="" />}
                         </div>
                ))} */}
                    
                    
                {/* </div> */}
                {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button> */}
            {/* </div>  */}

            
          {/* <img src={media} alt='preview' height='500px' width='500px' /> */}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button  type="submit" className="btn btn-primary mt-2">
          Create
        </button>
        {/* <p>{message}</p> */}
      </form>
    </div>
  );
};

export default CreatePost;
