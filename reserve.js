import React from "react";
import Footer from "./footer";
import { Button, Jumbotron } from "react-bootstrap";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { name: "John", age: 20 },
        { name: "Max", age: 30 },
        { name: "Florence", age: 40 }
      ],
      title: "Users List"
    };
    this.reduceAge = this.reduceAge.bind(this);
  }
  reduceAge() {
    this.setState({
      users: [
        { name: "John", age: 10 },
        { name: "Max", age: 20 },
        { name: "Florence", age: 30 }
      ]
    });
  }

  render() {
    return (
      <div className="homePage">
        <button onClick={this.reduceAge}>Reduce Age</button>
        <h1>{this.state.title}</h1>
        <Footer age={this.state.users[0].age}>
          {this.state.users[0].name}
        </Footer>
        <Footer age={this.state.users[1].age}>
          {this.state.users[1].name}
        </Footer>
        <Footer age={this.state.users[2].age}>
          {this.state.users[2].name}
        </Footer>
        /***********Bootstrp form **********************************/
        <form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Text"
            placeholder="Enter text"
          />
          <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
          />
          <FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
          />
          <FieldGroup
            id="formControlsFile"
            type="file"
            label="File"
            help="Example block-level help text here."
          />
        </form>
        /***********End form***************************************/
      </div>
    );
  }
}

/**************************************************************************/
// import React from "react";
// import Footer from "./footer";
//
// import { Button, Jumbotron } from "react-bootstrap";
//
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.reduceAge = this.reduceAge.bind(this);
//   }
//   reduceAge() {
//     this.setState({});
//   }
//
//   render() {
//     return <div className="homePage">App</div>;
//   }
// }

/****************************************************************************

/*****************************upload content*********************************/
// componentDidMount() {
//   axios.get("/getusercontent").then(resp => {
//     const { id, firstname, lastname, email, bio, imageUrl } = resp.data;
//     console.log(id, firstname, lastname, email, bio, imageUrl);
//     this.setState({
//       id,
//       firstname,
//       lastname,
//       email,
//       bio,
//       imageUrl: imageUrl || this.state.imageUrl
//     });
//   });
// }
/***********************************************************************/
// exports.inserContent = function(user_id, track, filename, image, media_type) {
//   return db.query(
//     `UPDATE Content
//       SET track = $1, user_id = $2, filename = $3, image = $4, media_type = $5
//       WHERE id = $2 RETURNING *`,
//     [user_id, track, filename, image, media_type]
//   );
// };

// -- CREATE TABLE content (
// --     id SERIAL PRIMARY KEY,
// --     user_id INTEGER NOT NULL REFERENCES member(id),
// --     track VARCHAR(300),
// --     filename VARCHAR(255) NOT NULL,
// --     image VARCHAR(300),
// --     media_type VARCHAR(255) NOT NULL
// -- );
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
      .post("/updatecontent", {
        id: this.state.id,
        track: this.state.track,
        filename: this.state.filename,
        image: this.state.image,
        media_type: this.state.media_type
      })
      .then(({ data }) => {
        console.log("Update content submit data:", data);
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
      <div className="uploadContent">
        <div className="uploadContentDiv">
          <label>Upload Track</label>
          <input

            onChange={this.handleChange}
            type="file"
            name="track"
            className="track"
            placeholder="Upload Track"
          />
          <input


            name="filename"
            className="filename"
            placeholder="FIle Name"
          />
          <br />
          <label>Upload Image</label>
          <input

            onChange={this.handleChange}
            type="file"
            name="image"
            className="image"
            placeholder="Image"
          />
          <br />
          <input

            onChange={this.handleChange}
            name="media_type"
            className="mediaType"
            placeholder="Media Type"
          />
          <br />
          <input type="file" id="ch" onChange={this.updateImage} />

          <Button bsStyle="primary">Edit Profile</Button>
        </div>
      </div>
    );
  }
}
