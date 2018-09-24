import React from "react";
// import { Jumbotron } from "react-bootstrap";

export default function Footer(props) {
  return (
    <div>
      Name: {props.children} | Age: {props.age}
    </div>
  );
}
