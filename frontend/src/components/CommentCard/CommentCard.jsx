import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts,getMyPosts} from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandle = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <div>
        <Typography>{comment}</Typography>

        {isAccount ? (
          <Button onClick={deleteCommentHandle} >
            <Delete />
          </Button>
        ) : userId === user._id ? (
          <Button onClick={deleteCommentHandle} >
            <Delete />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CommentCard;
