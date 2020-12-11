const INIT_STATE = {
  Name: "",
  Experience: "",
  Speciality: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case "MentorName": {
      return {
        Name: action.payload
      };
    }
    case "Experience": {
      return {
        Experience: action.payload
      };
    }
    case "Speciality": {
      return {
        Speciality: action.payload
      };
    }

    default:
      return state;
  }
};
