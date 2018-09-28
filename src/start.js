import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import Members from "./member";
import Footer from "./footer";
import Registration from "./Registration";
import Login from "./login";
import EditProfile from "./EditProfile";
import UploadContent from "./UploadContent";

let elem;
if (location.pathname === "/welcome") {
  elem = <Welcome />;
} else {
  elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
