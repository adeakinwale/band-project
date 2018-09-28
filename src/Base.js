import React from "react";
import App from "./App";
import EditComponent from "./EditProfile";
import UploadContent from "./UploadContent";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// import { Jumbotron } from "react-bootstrap";
console.log(EditComponent);
export default function Base(props) {
  return (
    <BrowserRouter>
      <div>
        <Route path="/editprofile" component={EditComponent} />
        <Route path="/app" component={App} />
        <Route path="/uploadcontent" component={UploadContent} />
      </div>
    </BrowserRouter>
  );
}
