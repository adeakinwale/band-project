import React from "react";
import axios from "./axios";

export default class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    axios.get("/getcontent").then(resp => {
      const {
        id,
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl
      } = resp.data;
      console.log(
        "get content on mount:",
        id,
        user_id,
        track,
        filename,
        image,
        media_type
      );
      this.setState({
        id,
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl: imageUrl || this.state.imageUrl
      });
    });
  }

  render() {
    return (
      <div className="musicPlayerDiv">
        <audio ref="audio_tag" src={this.state.track} controls autoPlay />
        <div className="wrapper">
          <div className="header">
            <img className="imgHeaderStyle" src="./IMG_8213.JPG" />
            <p>
              My Music Website <br /> Where music lives
            </p>
            <br className="pClear" />
          </div>
          <div className="tracks">
            <img className="trackCoverImage" src="./custom-album-cover.jpg" />
          </div>
        </div>
      </div>
    );
  }
}
