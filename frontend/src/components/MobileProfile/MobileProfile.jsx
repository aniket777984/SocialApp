import React, { useEffect, useState } from "react";
import "./MobileProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Dialog } from "@material-ui/core";
import User from "../User/User";
import { logout, deleteMyProfile } from "../../Actions/User";
import { clearErrors } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const MobileProfile = () => {
  const { user } = useSelector((state) => state.user);
  const {
    message,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const alert = useAlert();

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logout());
  };

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, deleteError, message]);

  return (
    <div className="profile">
      <div className="profileDetails">
        <img src={user.avatar.url} alt="user" />
        <Typography variant="h3">{user.name}</Typography>
      </div>
      <div className="otherDetails">
        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>
        <Button
          variant="contained"
          style={{ marginTop: "5px", backgroundColor: "green", color: "white" }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>

      <div className="actions">
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="contained"
          style={{
            marginTop: "10px",
            backgroundColor: "red",
            color: "white",
            padding: "1vmax",
          }}
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          Delete My Profile
        </Button>
      </div>

      <Dialog
        open={followersToggle}
        onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Followers</Typography>

          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <User
                key={follower._id}
                userId={follower._id}
                name={follower.name}
                avatar={follower.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You have no followers
            </Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Following</Typography>

          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow.avatar.url}
              />
            ))
          ) : (
            <Typography style={{ margin: "2vmax" }}>
              You're not following anyone
            </Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={deleteToggle}
        onClose={() => setDeleteToggle(!deleteToggle)}
      >
        <div className="deleteDialog">
          <Typography variant="h5">
            Do You Surely Want to Delete Your Profile
          </Typography>
          <button onClick={deleteProfileHandler} disabled={deleteLoading}>
            Confirm Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default MobileProfile;
