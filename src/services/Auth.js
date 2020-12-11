const doLogin = (username) => {
  localStorage.setItem("username", username);
  localStorage.setItem("isLoggedIn", true);
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("isLoggedIn"));
};

const handleLogout = (props) => {
  localStorage.removeItem("username");
  localStorage.removeItem("isLoggedIn");
  props.history.push("/login");
};

export default {
  doLogin,
  isLoggedIn,
  handleLogout
};
