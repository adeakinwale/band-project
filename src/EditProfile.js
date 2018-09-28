import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }
  componentDidMount() {
    axios.get("/getuserprofile").then(resp => {
      const { id, firstname, lastname, email, bio, imageUrl } = resp.data;
      console.log(id, firstname, lastname, email, bio, imageUrl);
      this.setState({
        id,
        firstname,
        lastname,
        email,
        bio,
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

    axios.post("/uploadimage", fd).then(({ data }) => {
      console.log("data post upload: ", data);
      console.log("dataurl: ", data.url);
      this.props.updateImage(data.url);
    });
  }
  ////END UPLOADER /////
  submit() {
    axios
      .post("/editprofile", {
        id: this.state.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        bio: this.state.bio
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
          <span>
            <Link to="/app">Back To Profile</Link>
          </span>
          <br />
          <br />
          <input
            defaultValue={this.state.firstname}
            onChange={this.handleChange}
            name="firstname"
            className="input"
            placeholder="First Name"
          />
          <br />
          <br />
          <input
            defaultValue={this.state.lastname}
            onChange={this.handleChange}
            name="lastname"
            className="input"
            placeholder="Last Name"
          />
          <br />
          <br />
          <input
            defaultValue={this.state.email}
            onChange={this.handleChange}
            name="email"
            className="input"
            placeholder="Email"
          />
          <br />
          <br />
          <input
            defaultValue={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <br />
          <br />
          <textarea
            defaultValue={this.state.bio}
            onChange={this.handleChange}
            name="bio"
            className="bioInput"
            placeholder="Update bio / info "
          />
          <br />
          <br />

          <input
            type="file"
            className="editTextarea"
            onChange={this.updateImage}
          />
          <Button
            className="editProfButton"
            bsStyle="primary"
            onClick={this.submit}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    );
  }
}
