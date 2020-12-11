import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "react-select";

export default function Form(props) {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(true);
  const [Id, setId] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);

  const options = [
    { value: "Interview", label: "Mock Interview" },
    { value: "One-One session", label: "One-One session" },
    { value: "Group session", label: "Group session" },
    { value: "Instructor", label: "Instructor" }
  ];

  const handleChange = (e) => {
    setSelectedOption(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const validate = (name, exp, spec, arr) => {
    if (name !== "" && exp !== "" && spec !== "" && arr.length !== 0) {
      if (!name.match(/[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/)) {
        alert("Only Letters are Allowed in Name field ");
        return false;
      } else if (!spec.match(/[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/)) {
        alert("Only Letters are Allowed in Speciality field");
        return false;
      }

      return true;
    }

    alert("All fields are required ");
    return false;
  };

  const handleClick = () => {
    if (validate(name, experience, speciality, selectedOption)) {
      let obj = {
        Name: name,
        Experience: experience,
        Speciality: speciality,
        SelectedOption: selectedOption
      };

      axios.post("http://localhost:3000/mentor", obj).then((res) => {
        console.log(res);
        console.log(res.data);
      });
      window.location.reload();
    }
  };

  const handleSave = () => {};

  return (
    <>
      <div className="form">
        <div className="listTitle">
          Name :{" "}
          <Input
            value={name}
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
        </div>
        <div className="listTitle">
          Experience :{" "}
          <Input
            type="number"
            value={experience}
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          />{" "}
        </div>
        <div className="listTitle">
          Speciality :{" "}
          <Input
            value={speciality}
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => {
              setSpeciality(e.target.value);
            }}
          />{" "}
        </div>
        <div className="Select">
          <span className="selectTitle">Choose Tasks</span>
          <Select
            className="dropdown"
            placeholder="Select Option"
            value={options.filter((obj) => selectedOption.includes(obj.value))} // set selected values
            options={options} // set list of the data
            onChange={handleChange} // assign onChange function
            isMulti
            isClearable
          />
        </div>
        <div className="addButton">
          {open ? (
            <Button onClick={handleClick} variant="contained" color="primary">
              Add
            </Button>
          ) : (
            <Button onClick={handleSave} variant="contained" color="primary">
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
