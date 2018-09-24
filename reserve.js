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
