import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import Videos from "./Videos";
import Photos from "./Photos";
import Events from "./Events";
import Bio from "./Bio";

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
                <div className="profileImageLinkDiv">
                    <Profile
                        imageUrl={this.state.imageUrl}
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        bio={this.state.bio}
                    />
                </div>
                <div className="profileResourceDiv">
                    <h1> resource display section </h1>
                    <Bio />
                </div>
            </div>
        );
    }
}
