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
      <HashRouter>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <div className="welcomePage">
                <div className="welcomeTextDiv">
                  <nav>
                    <div className="options">
                      <h1>Let The Music Speak</h1>
                    </div>
                    <Link to="/register">
                      <Button bsStyle="primary">Register</Button>
                    </Link>
                    <Link to="/login">
                      <Button bsStyle="primary">Login</Button>
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          />

          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
        </div>
      </HashRouter>
    );
  }
}
