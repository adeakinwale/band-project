import React from "react";
import Footer from "./footer";
import { Button, Jumbotron } from "react-bootstrap";
// import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reduceAge = this.reduceAge.bind(this);
  }
  reduceAge() {
    this.setState({});
  }

  render() {
    return (
      <div className="welcomePage">
        <div className="welcomeTextDiv">
          <h1>Let The Music Speak</h1>
          <p>
            <Button bsStyle="primary">Register</Button>
          </p>
        </div>

        <div className="registrationDiv" />
      </div>
    );
  }
}
