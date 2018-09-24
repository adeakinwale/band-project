import React from "react";
import axios from "./axios";
import { Jumbotron, Button } from "react-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }
  submit() {
    axios
      .post("/login", {
        email: this.email,
        password: this.password
      })
      .then(({ data }) => {
        if (data.success) {
          location.replace("/app");
        } else {
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div className="login">
        {this.state.error && <div className="error">TRY AGAIN</div>}
        <h1>Log In page</h1>
        <div className="loginInputDiv ">
          <input
            onChange={this.handleChange}
            name="email"
            className="input"
            placeholder="Email"
          />
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <Button bsStyle="primary" onClick={this.submit} className="button">
            Login
          </Button>
        </div>
      </div>
    );
  }
}
