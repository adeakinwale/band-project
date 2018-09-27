import React from "react";
import Registration from "./Registration";
import { Button, Jumbotron } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
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
        //////
        <BrowserRouter>
          <div className="welcomeTextDiv">
            <div id="options">
              <h1>Let The Music Speak</h1>
              <Link to="/register">
                <Button bsStyle="primary">Register</Button>
              </Link>
            </div>

            <Route path="/register" component={Registration} />
          </div>
        </BrowserRouter>
        <div className="registrationDiv" />
      </div>
    );
  }
}
