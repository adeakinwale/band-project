import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "./axios";
// import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    console.log("profile props:", this.props.state);
    const { bio, firstname, lastname, imageUrl } = this.props;

    return (
      <div className="profile">
        <div className="profilLinkDiv">
          <h1 className="">
            {firstname} {lastname}
          </h1>
          <br />
          <h4>ABOUT ME</h4>

          <h4>PHOTOS</h4>
          <h4>ALBUMS / TRACKS</h4>
          <h4>VIDEOS</h4>
          <h4>EVENTS</h4>

          <h3 className="bio">{bio}</h3>
        </div>
        <div className="profileimage">
          <img src={imageUrl} />
        </div>
      </div>
    );
  }
}

export default Profile;
