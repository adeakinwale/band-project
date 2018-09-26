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
