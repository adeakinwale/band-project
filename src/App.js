import React from "react";
import axios from "./axios";
// import { Logo } from "./logo";
import { BrowserRouter, Route } from "react-router-dom";
// import ProfilePic from "./profilepic";
import Profile from "./Profile";
// import Uploader from "./uploader";
// import OtherProfile from "./OtherProfile";
// import Friends from "./Friends";
// import OnlineUsers from "./OnlineUsers";
// import Chat from "./Chat";
// import FriendNotice from "./FriendReqNotice";
import { Link } from "react-router-dom";
//import { getSocket } from "./socket";
import { connect } from "react-redux";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    /////////////////////////////
    // this.toggleBio = this.toggleBio.bind(this);
    // this.setBio = this.setBio.bind(this);
    // ////////////////////////////////
    // this.updateImage = this.updateImage.bind(this);
    // this.makeUploaderVisible = this.makeUploaderVisible.bind(this);
  }
  componentDidMount() {
    axios.get("/getuserprofile").then(resp => {
      const { id, firstname, lastname, email, bio, imageUrl } = resp.data;
      console.log(id, firstname, lastname, email, bio, imageUrl);
      this.setState({
        id,
        firstname,
        lastname,
        email,
        bio,
        imageUrl: imageUrl || this.state.imageUrl
      });
    });
  }

  render() {
    if (!this.state.id) {
      return <div>Loading...</div>;
    }

    return (
      <div className="app">
        <div>
          <Profile
            firstname={this.state.firstname}
            lastname={this.state.lastname}
          />
        </div>
      </div>
    );
  }
}

// const mapFriendReNoticetoProps = state => {
//   // console.log("inside mapFriendReNoticetoProps:", state);
//   return {
//     friendNotice: state.friendNotice
//   };
// };
//
// export default connect(mapFriendReNoticetoProps)(App);
