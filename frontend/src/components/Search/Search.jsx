import { Button, Typography } from "@material-ui/core";
import React,{Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";
import Loader from "../Loader/Loader";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="search">
          <form className="searchForm" onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
              Social Aap
            </Typography>

            <input
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Button disabled={loading} type="submit">
              Search
            </Button>

            <div className="searchResults">
              {users &&
                users.map((user) => (
                  <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}
                  />
                ))}
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Search;
