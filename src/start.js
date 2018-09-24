import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import Members from "./member";
import Footer from "./footer";
import Registration from "./Registration";
import Login from "./login";

// let elem;

if (location.pathname == "/") {
  ReactDOM.render(<Welcome />, document.querySelector("main"));
  // elem = <Welcome />;
} else if (location.pathname == "/members") {
  ReactDOM.render(<Members />, document.querySelector("main"));
} else if (location.pathname == "/footer") {
  ReactDOM.render(<Footer />, document.querySelector("main"));
} else if (location.pathname == "/register") {
  ReactDOM.render(<Registration />, document.querySelector("main"));
} else if (location.pathname == "/login") {
  ReactDOM.render(<Login />, document.querySelector("main"));
} else if (location.pathname == "/app") {
  ReactDOM.render(<App />, document.querySelector("main"));
}
// else if (location.pathname == "/profile") {
//   ReactDOM.render(<Profile />, document.querySelector("main"));
//
// }

// ReactDOM.render(<elem />, document.querySelector("main"));
