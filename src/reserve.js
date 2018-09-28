import React from "react";
import axios from "./axios";

export default class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSong: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios.get("/getcontent").then(resp => {
      /*const {
        id,
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl
      } = resp.data;*/

      console.log("current artist firstname:", resp.data);
      this.setState(
        {
          contents: resp.data.content,
          curTrack: resp.data.content[0].track,
          curArtistF: resp.data.content[0].firstname,
          curArtistL: resp.data.content[0].lastname
        },

        () => console.log("this state:", this.state)
      );
    });
  }
  handleClick(clkId) {
    const clickedDude = this.state.contents.filter(item => clkId == item.id);
    console.log("this is the clickedDude:", clickedDude);
    this.setState({
      selectedSong: clickedDude[0]
    });
  }

  render() {
    if (!this.state.contents) {
      return <div>Loading....</div>;
    }
    console.log("this.state albums:", this.state.contents);
    return (
      <div>
        <div className="header">
          <img className="imgHeaderStyle" src="./IMG_8213.JPG" />
          <p />
          <p>
            My Music Website <br /> Where music lives
            <br />
            <br />
            <audio
              ref="audio_tag"
              src={this.state.selectedSong.track}
              controls
              autoPlay
            />
          </p>
          <br className="pClear" />
        </div>

      </div>
    );
  }
}



/***********************************/
import React from "react";
import axios from "./axios";

export default class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSong: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios.get("/getcontent").then(resp => {
      /*const {
        id,
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl
      } = resp.data;*/

      console.log("current artist firstname:", resp.data);
      this.setState(
        {
          contents: resp.data.content,
          curTrack: resp.data.content[0].track,
          curArtistF: resp.data.content[0].firstname,
          curArtistL: resp.data.content[0].lastname
        },

        () => console.log("this state:", this.state)
      );
    });
  }
  handleClick(clkId) {
    const clickedDude = this.state.contents.filter(item => clkId == item.id);
    console.log("this is the clickedDude:", clickedDude);
    this.setState({
      selectedSong: clickedDude[0]
    });
  }

  render() {
    if (!this.state.contents) {
      return <div>Loading....</div>;
    }
    console.log("this.state albums:", this.state.contents);
    return (
      <div className="musicPlayerDiv">
        <div className="wrapper">
          <div className="header">
            <img className="imgHeaderStyle" src="./IMG_8213.JPG" />
            <p />
            <p>
              My Music Website <br /> Where music lives
              <br />
              <br />
              <audio
                ref="audio_tag"
                src={this.state.selectedSong.track}
                controls
                autoPlay
              />
            </p>
            <br className="pClear" />
          </div>
          {this.state.contents.map(content => (
            <div
              className="tracks"
              onClick={() => this.handleClick(content.id)}
            >
              <div className="trackCard">
                <img
                  className="trackCoverImage"
                  src="./custom-album-cover.jpg"
                />
                <br />
                <br />
                <p>
                  Song: {content.filename} <br />
                  <br />
                  Artist:{" "}
                  <b>
                    {content.firstname} {content.lastname}
                  </b>
                  <br />
                  <div className="uploadDate">
                    Upload on:{content.uploaded_at}
                  </div>
                  <br />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

/************************************
