import "./UpdatePassword.css";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { Visibility,VisibilityOff } from "@material-ui/icons";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
  };

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
      history.push("/account");
    }
  }, [dispatch, alert, error, message, history]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>
        <div>
          <input
            type={passwordType}
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={togglePassword} type="button"
          >
          {passwordType === "password" ? (
            <VisibilityOff />
          ) : (
            <Visibility />
          )}
          </button>
        </div>
        <div>
          <input
            type={passwordType}
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={togglePassword} type="button"
          >
          {passwordType === "password" ? (
            <VisibilityOff />
          ) : (
            <Visibility />
          )}
          </button>
        </div>

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
