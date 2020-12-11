import React from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import "./../styles.css";
import MentorList from "./MentorList";

import authService from "../services/Auth";

export default function Home(props) {
  if (!authService.isLoggedIn()) {
    props.history.push("/login");
  }
  return (
    <>
      <Navbar handleLogout={authService.handleLogout} prop={props} />
      <div className="container">
        <Form prop={props} />
        <MentorList />
      </div>
    </>
  );
}
