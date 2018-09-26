import React from "react";
import axios from "./axios";
import { Button } from "react-bootstrap";

export default class UploadContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }
  componentDidMount() {
    axios.get("/getcontent").then(resp => {
      console.log("upload content mount:", resp);
      const {
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl
      } = resp.data;

      this.setState({
        user_id,
        track,
        filename,
        image,
        media_type,
        imageUrl: imageUrl || this.state.imageUrl
      });
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  ////IMAGE UPLOADER/////
  updateImage(e) {
    this.file = e.target.files[0];
    let file = this.file;
    const fd = new FormData();
    console.log("FILE: ", file);
    fd.append("file", file);

    axios.post("/uploadcontent", fd).then(({ data }) => {
      console.log("data post upload: ", data);
      console.log("dataurl: ", data.url);
      this.props.updateImage(data.url);
    });
  }
  ////END UPLOADER /////
  submit() {
    axios
      .post("/editcontent", {
        id: this.state.id,
        user_id: this.state.user_id,
        filename: this.state.filename,
        image: this.state.image,
        media_type: this.state.media_type
      })
      .then(({ data }) => {
        console.log("Editprofile submit data:", data);
        if (data.success) {
          // this.setState({ logged: true });
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
      <div className="editProfile">
        <div className="editProfileInputDiv">
          <label>Track</label>
          <br />
          <input type="file" name="track" onChange={this.updateImage} />
          <br />
          <label>File Name</label>
          <br />
          <input
            onChange={this.handleChange}
            name="filename"
            className="input"
            placeholder="File Name"
          />
          <br />
          <label>Image</label>
          <input type="file" name="image" onChange={this.updateImage} />
          <br />
          <label>Media Type</label>
          <br />
          <input
            onChange={this.handleChange}
            name="media_type"
            className="media_type"
            placeholder="Media Type"
          />
          <br />
          <Button bsStyle="primary" onClick={this.submit}>
            Upload Content
          </Button>
        </div>
      </div>
    );
  }
}
