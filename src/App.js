import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Videos from "./Videos";
import Music from "./Music";
import Photos from "./Photos";
import Events from "./Events";
import Bio from "./Bio";
import Albums from "./Albums";

import Navigation from "./Nav";

import { connect } from "react-redux";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div className="overAllDiv">
        <BrowserRouter>
          <div className="browserRouterDiv">
            <Navigation />
            <Link to="/logout">
              <h4>logout</h4>
            </Link>
            <div className="profileImageLinkDiv">
              <div className="profile">
                <div className="profilLinkDiv">
                  <h2 className="">
                    {this.state.firstname} {this.state.lastname}
                  </h2>
                  <br />
                  <div className="options">
                    <Link to="/bio">
                      <h4>Bio / Info</h4>
                    </Link>
                    <Link to="/photos">
                      <h4>Photos</h4>
                    </Link>
                    <Link to="/albums">
                      <h4>Abums / Tracks</h4>
                    </Link>
                    <Link to="/videos">
                      <h4>Videos</h4>
                    </Link>
                    <Link to="/events">
                      <h4>Events</h4>
                    </Link>
                  </div>
                </div>
                <div className="profileimage">
                  <img src={this.state.imageUrl} />
                </div>
              </div>
            </div>
            <div className="profileResourceDiv">
              <Route path="/bio" render={() => <Bio bio={this.state.bio} />} />
              <Route path="/photos" component={Photos} />
              <Route path="/music" component={Music} />
              <Route path="/videos" component={Videos} />
              <Route path="/events" component={Events} />
              <Route path="/albums" component={Albums} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
