import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import axios from "axios";

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    name: props.mentor.Name,
    exp: props.mentor.Experience,
    special: props.mentor.Speciality,
    selectedOption: props.mentor.SelectedOption
  });
  let name = props.mentor.Name;
  const options = [
    { value: "Interview", label: "Mock Interview" },
    { value: "One-One session", label: "One-One session" },
    { value: "Group session", label: "Group session" },
    { value: "Instructor", label: "Instructor" }
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(false);

    let obj = {
      Name: state.name,
      Experience: state.exp,
      Speciality: state.special,
      SelectedOption: state.selectedOption
    };

    axios.put(`http://localhost:3000/mentor/${name}`, obj).then((res) => {
      console.log(res);
      console.log(res.data);
    });
    window.location.reload();
  };

  const handleChange = (e) => {
    setState({ selectedOption: Array.isArray(e) ? e.map((x) => x.value) : [] });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        className="unique"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContentText id="alert-dialog-description">
          <TextField
            id="standard-basic"
            value={state.name}
            onChange={(e) => {
              setState({ name: e.target.value });
            }}
            label="name"
          />
          <TextField
            id="standard-basic"
            label="experience"
            value={state.exp}
            onChange={(e) => {
              setState({ exp: e.target.value });
            }}
          />
          <TextField
            id="standard-basic"
            label="speciality"
            value={state.special}
            onChange={(e) => {
              setState({ special: e.target.value });
            }}
          />
          <Select
            className="dropdown"
            placeholder="Select Option"
            value={options.filter((obj) =>
              state.selectedOption.includes(obj.value)
            )}
            options={options}
            onChange={handleChange}
            isMulti
            isClearable
          />
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
