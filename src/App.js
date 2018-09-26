import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./Profile";
import { Link } from "react-router-dom";
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
                <div className="app">
                    <div>
                        <Profile
                            imageUrl={this.state.imageUrl}
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            bio={this.state.bio}
                        />
                    </div>
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
