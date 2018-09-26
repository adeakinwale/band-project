import React from "react";
// import { Jumbotron } from "react-bootstrap";

export default class Albums extends React.Component {
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
          <h1> resource display section </h1>
        </div>
      </div>
    );
  }
}
