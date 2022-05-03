import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { Typography, Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";

const NewPost = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, error, message } = useSelector((state) => state.like);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("caption", caption);
    myForm.set("image", image);
    await dispatch(createNewPost(myForm));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form
        className="newPostForm"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          disabled={loading}
          type="submit"
          style={{ backgroundColor: "green", color: "white", padding: "1vmax 2vmax" }}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
