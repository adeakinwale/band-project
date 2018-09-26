import React from "react";
// import { Jumbotron } from "react-bootstrap";

export default class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get("/getvideos").then(resp => {
      const {} = resp.data;
      console.log(id);
      this.setState({
        id,

        imageUrl: imageUrl || this.state.imageUrl
      });
    });
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
