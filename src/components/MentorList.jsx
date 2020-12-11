import React, { useEffect, useState } from "react";
import "./../styles.css";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import Form from "./Form";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import EditMentor from "./EditMentor";

export default class MentorList extends React.Component {
  state = {
    mentor: [],
    name: "",
    experience: "",
    speciality: "",
    task: [],
    open: true
  };

  componentDidMount() {
    axios.get(`http://localhost:3000/mentor`).then((res) => {
      const mentor = res.data;
      this.setState({ mentor: mentor });
    });
  }

  handleEdit(e) {
    this.setState({ open: false });
    // <Form name={name} exp={exp} spec={spec} task={task} />;
  }
  handleDelete(name) {
    axios.delete(`http://localhost:3000/mentor/${name}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    window.location.reload();
  }

  render() {
    return (
      <>
        {console.log(this.state.persons)}
        <div className="list">
          {this.state.mentor.map((mentor, index) => (
            <div className="box" key={index}>
              <h4 className="name">
                {" "}
                <span className="sname">Mentor Name - </span>
                {this.state.open ? (
                  <span>{mentor.Name}</span>
                ) : (
                  <InputBase
                    className="Input"
                    disabled
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                      console.log(this.state.name);
                    }}
                    defaultValue={mentor.Name}
                    inputProps={{ "aria-label": "naked" }}
                  />
                )}
                {/* <input type="text" disabled value={this.state.name} /> */}
              </h4>
              <h4 className="exp">
                {" "}
                <span className="exp">Experience - </span>
                {this.state.open ? (
                  <span>{mentor.Experience}</span>
                ) : (
                  <InputBase
                    className="Input"
                    onChange={(e) => {
                      this.setState({ experience: e.target.value });
                    }}
                    defaultValue={mentor.Experience}
                    inputProps={{ "aria-label": "naked" }}
                  />
                )}
              </h4>
              <h4 className="speciality">
                {" "}
                <span className="spec">Speciality - </span>
                {mentor.Speciality}
              </h4>
              <h4 className="tasks">
                <span className="task">Tasks - </span>
                <ul>
                  {mentor.SelectedOption.map((task, id) => (
                    <div key={id}>
                      <li> {task}</li>
                    </div>
                  ))}
                </ul>
              </h4>
              <div className="icon">
                <EditMentor
                  onClick={(index) => {
                    this.handleEdit();
                  }}
                  mentor={mentor}
                />
                <Button
                  variant="contained"
                  onClick={(index) => {
                    this.handleDelete(mentor.Name);
                  }}
                  color="secondary"
                >
                  Delete
                </Button>
                {/* <DeleteIcon
                  onClick={(index) => {
                    this.handleDelete(mentor.Name);
                  }}
                /> */}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
