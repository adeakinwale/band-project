import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";

export default class Registration extends React.Component {
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
    console.log("These: ", this.first, this.email);
    axios
      .post("/register", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
      .then(({ data }) => {
        console.log("Registration submit data:", data);
        if (data.success) {
          this.setState({ logged: true });
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
      <div className="register">
        {this.state.error && <div className="error">PLEASE TRY AGAIN</div>}

        <div className="registerInputDiv">
          <input
            onChange={this.handleChange}
            name="firstname"
            className="input"
            placeholder="First Name"
          />
          <input
            onChange={this.handleChange}
            name="lastname"
            className="input"
            placeholder="Last Name"
          />
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

          <Button bsStyle="primary" onClick={this.submit}>
            Register
          </Button>
          <h1 id="h1Registration" />

          {/*<h1 id="h1Registration">
            Already a member ? <Link to="/login">Click here to Log in!</Link>
          </h1>*/}
        </div>
      </div>
    );
  }
}
