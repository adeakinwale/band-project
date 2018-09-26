import React from "react";
// import { Jumbotron } from "react-bootstrap";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Herbbie Hancock"
    };
  }

  render() {
    return (
      <div className="">
        <div className="profileVideoDiv">
          <h1>I am {this.state.name}</h1>
        </div>
      </div>
    );
  }
}
