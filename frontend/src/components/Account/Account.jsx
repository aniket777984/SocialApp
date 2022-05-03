import React, { Fragment, useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, logout, deleteMyProfile } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import { Typography, Avatar, Button, Dialog } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Account = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

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
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return (
    <Fragment>
      {loading === true || userLoading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="userProfileLink">
            <Link to="/profile">See your profile Details</Link>
          </div>
          <div className="account">
            <div className="accountleft">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    postId={post._id}
                    caption={post.caption}
                    postImage={post.image.url}
                    likes={post.likes}
                    comments={post.comments}
                    ownerImage={post.owner.avatar.url}
                    ownerName={post.owner.name}
                    ownerId={post.owner._id}
                    createdAt={post.createdAt}
                    isAccount={true}
                    isDelete={true}
                  />
                ))
              ) : (
                <Typography variant="h6">
                  Haven't Made Any Post Till Date
                </Typography>
              )}
            </div>
            <div className="accountright">
              <Avatar
                src={user.avatar.url}
                style={{ height: "5vmax", width: "5vmax" }}
              />
              <Typography variant="h5">{user.name}</Typography>
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
              <Button variant="contained" onClick={logoutHandler}>
                Logout
              </Button>
              <Link to="/update/profile">Edit Profile</Link>
              <Link to="/update/password">Change Password</Link>

              <Button
                onClick={() => setDeleteToggle(!deleteToggle)}
                variant="text"
                style={{ color: "red", margin: "2vmax" }}
              >
                Delete My Profile
              </Button>

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
                  <button
                    onClick={deleteProfileHandler}
                    disabled={deleteLoading}
                  >
                    Confirm Delete
                  </button>
                </div>
              </Dialog>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Account;
