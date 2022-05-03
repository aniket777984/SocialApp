import React, { Fragment, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@material-ui/icons";
import { Typography } from "@material-ui/core";

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <Fragment>
      <div className="heading">
        <Typography variant="h2">Social App</Typography>
      </div>
      <div className="header">
        <Link to="/" onClick={() => setTab("/")}>
          {tab === "/" ? <Home style={{ color: "red" }} /> : <HomeOutlined />}
        </Link>

        <Link to="/newpost" onClick={() => setTab("/newpost")}>
          {tab === "/newpost" ? (
            <Add style={{ color: "red" }} />
          ) : (
            <AddOutlined />
          )}
        </Link>

        <Link to="/search" onClick={() => setTab("/search")}>
          {tab === "/search" ? (
            <Search style={{ color: "red" }} />
          ) : (
            <SearchOutlined />
          )}
        </Link>

        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? (
            <AccountCircle style={{ color: "red" }} />
          ) : (
            <AccountCircleOutlined />
          )}
        </Link>
      </div>
    </Fragment>
  );
};

export default Header;
