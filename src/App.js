import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Videos from "./Videos";
import Music from "./Music";
import Photos from "./Photos";
import Events from "./Events";
import Bio from "./Bio";

import Albums from "./Albums";

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
            <div className="profileImageLinkDiv">
              <div className="profile">
                <div className="profilLinkDiv">
                  <h1 className="">
                    {this.state.firstname} {this.state.lastname}
                  </h1>
                  <br />
                  <div id="options">
                    <Link to="/bio">
                      <h4>BIO / INFO</h4>
                    </Link>
                    <Link to="/photos">
                      <h4>PHOTOS</h4>
                    </Link>
                    <Link to="/albums">
                      <h4>ALBUMS / TRACKS</h4>
                    </Link>
                    <Link to="/videos">
                      <h4>VIDEOS</h4>
                    </Link>
                    <Link to="/events">
                      <h4>EVENTS</h4>
                    </Link>
                  </div>
                </div>
                <div className="profileimage">
                  <img src={this.state.imageUrl} />
                </div>
              </div>
            </div>
            <div className="profileResourceDiv">
              <p> resource display section </p>
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
