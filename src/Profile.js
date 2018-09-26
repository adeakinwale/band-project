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
     
    );
  }
}

export default Profile;
