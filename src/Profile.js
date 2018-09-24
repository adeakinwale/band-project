import React, { Component } from "react";
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
        <div>
          <h4>ABOUT ME</h4>
          <h1>INFO / BIO</h1>
          <br />
          <h1 className="bionames">
            {firstname} {lastname}
          </h1>
          <h3 className="bio">{bio}</h3>
        </div>
        <div>
          <img className="profileimage" src={imageUrl} />
        </div>
      </div>
    );
  }
}

export default Profile;
