import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({type : "LOGOUT_USER_REQUEST"})
    await axios.get(`/api/v1/logout`);

    dispatch({ type: "LOGOUT_SUCCESS"});
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
};

//GetPostOfFollowing
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "postOfFollowingRequest" });

    const { data } = await axios.get("/api/v1/posts")

    dispatch({ type: "postOfFollowingSuccess", payload: data.posts});
  } catch (error) {
    dispatch({ type: "postOfFollowingFailure", payload: error.response.data.message });
  }
};

//GetAllUsers
export const getAllUsers = (keyword="") => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });

    const { data } = await axios.get(`/api/v1/users?keyword=${keyword}`)

    dispatch({ type: "allUsersSuccess", payload: data.users});
  } catch (error) {
    dispatch({ type: "allUsersFailure", payload: error.response.data.message });
  }
};

//GetMyPosts
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostsRequest" });

    const { data } = await axios.get("/api/v1/my/posts");

    dispatch({ type: "myPostsSuccess", payload: data.posts});
  } catch (error) {
    dispatch({ type: "myPostsFailure", payload: error.response.data.message });
  }
};

//UpdateProfile
export const updateProfile = (userData) => async (dispatch) => {
  try {

    dispatch({ type: "updateProfileRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/update/profile`, userData, config);
    dispatch({ type: "updateProfileSuccess", payload: data.message});
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

//UpdatePassword
export const updatePassword = (oldPassword,newPassword) => async (dispatch) => {
  try {

    dispatch({ type: "updatePasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/update/password`, {oldPassword,newPassword}, config);
    dispatch({ type: "updatePasswordSuccess", payload: data.message});
  } catch (error) {
    dispatch({
      type: "updatePasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//DeleteProfile
export const deleteMyProfile = () => async (dispatch) => {
  try {

    dispatch({ type: "deleteProfileRequest" });

    const { data } = await axios.delete(`/api/v1/delete/me`);
    dispatch({ type: "deleteProfileSuccess", payload: data.message});
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

//ForgotPassword
export const forgotPassword = (email) => async (dispatch) => {
  try {

    dispatch({ type: "forgotPasswordRequest" });

    
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/forgot/password` , {email} , config);

    dispatch({ type: "forgotPasswordSuccess", payload: data.message});
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//ResetPassword
export const resetPassword = (token,password) => async (dispatch) => {
  try {

    dispatch({ type: "resetPasswordRequest" });

    
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/password/reset/${token}` , {password} , config);

    dispatch({ type: "resetPasswordSuccess", payload: data.message});
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

//GetUserPosts
export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userPostsRequest" });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);

    dispatch({ type: "userPostsSuccess", payload: data.posts});
  } catch (error) {
    dispatch({ type: "userPostsFailure", payload: error.response.data.message });
  }
};

//GetUserProfile
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userProfileRequest" });

    const { data } = await axios.get(`/api/v1/user/${id}`);

    dispatch({ type: "userProfileSuccess", payload: data.user});
  } catch (error) {
    dispatch({ type: "userProfileFailure", payload: error.response.data.message });
  }
};

//GetUserProfile
export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });

    const { data } = await axios.get(`/api/v1/follow/${id}`);

    dispatch({ type: "followUserSuccess", payload: data.message});
  } catch (error) {
    dispatch({ type: "followUserFailure", payload: error.response.data.message });
  }
};

// Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};