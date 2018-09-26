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

if (location.pathname == "/") {
  elem = <Welcome />;
} else if (location.pathname == "/app") {
  elem = <App />;
} else if (location.pathname == "/members") {
  elem = <Members />;
} else if (location.pathname == "/footer") {
  elem = <Footer />;
} else if (location.pathname == "/register") {
  elem = <Registration />;
} else if (location.pathname == "/login") {
  elem = <Login />;
} else if (location.pathname == "/editprofile") {
  elem = <EditProfile />;
} else if (location.pathname == "/uploadcontent") {
  elem = <UploadContent />;
}

ReactDOM.render(elem, document.querySelector("main"));
