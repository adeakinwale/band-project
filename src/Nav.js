import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import { Jumbotron } from "react-bootstrap";

export default function Navigation(props) {
  return (
    <div className="navs">
      <div className="nav">
        <ul className="navbar">
          <li>
            <Link to="/editprofile">Edit Profile</Link>
          </li>
          <li>
            <Link to="/uploadcontent">Upload Content</Link>
          </li>

          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
