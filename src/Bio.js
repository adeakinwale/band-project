import React from "react";
// import { Jumbotron } from "react-bootstrap";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="">
        <div className="bioDiv">
          <h3>{this.props.bio}</h3>
        </div>
      </div>
    );
  }
}
