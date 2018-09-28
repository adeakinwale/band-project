import React from "react";
import Registration from "./Registration";
import Login from "./login";
import { Button, Jumbotron } from "react-bootstrap";
import { HashRouter, Route, Link } from "react-router-dom";
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
        <HashRouter>
          <div className="welcomeTextDiv">
            <Route
              exact
              path="/"
              render={() => (
                <nav>
                  <div id="options">
                    <h1>Let The Music Speak</h1>
                  </div>
                  <Link to="/register">
                    <Button bsStyle="primary">Register</Button>
                  </Link>
                  <Link to="/login">
                    <Button bsStyle="primary">Login</Button>
                  </Link>
                </nav>
              )}
            />

            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login} />
          </div>
        </HashRouter>
        <div className="registrationDiv" />
      </div>
    );
  }
}
