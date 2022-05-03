import axios from "axios";

//Like and Unlike Post
export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "likeRequest" });

    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({ type: "likeSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "likeFailure", payload: error.response.data.message });
  }
};

// Add or Update Comments
export const addCommentOnPost = (id,comment) => async (dispatch) => {
  try {
    dispatch({ type: "addCommentRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/post/comment/${id}`, {comment},config);

    dispatch({ type: "addCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "addCommentFailure", payload: error.response.data.message });
  }
};

// Delete Comment
export const deleteCommentOnPost = (id,commentId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCommentRequest" });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data : {commentId},
    });

    dispatch({ type: "deleteCommentSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deleteCommentFailure", payload: error.response.data.message });
  }
};

// Create New Post
export const createNewPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: "newPostRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/post/upload`,postData,config);

    dispatch({ type: "newPostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "newPostFailure", payload: error.response.data.message });
  }
};

// UpdatePostCaption
export const updatePost = (caption,id) => async (dispatch) => {
  try {
    dispatch({ type: "updateCaptionRequest" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/post/${id}`,{caption} , config);

    dispatch({ type: "updateCaptionSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateCaptionFailure", payload: error.response.data.message });
  }
};

// DeletePost
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletePostRequest" });

    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({ type: "deletePostSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deletePostFailure", payload: error.response.data.message });
  }
};




// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};