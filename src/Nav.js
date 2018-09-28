import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import { Jumbotron } from "react-bootstrap";

export default function Navigation(props) {
  return (
    <div className="nav">
      <span>
        <Link to="/editprofile">Edit Profile</Link>
      </span>
      <span>
        <Link to="/uploadcontent">Upload Content</Link>
      </span>

      <span>
        <a href="/logout">Logout</a>
      </span>
    </div>
  );
}
