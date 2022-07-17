import axios from "axios";

//Register User To Backend

const UserData = JSON.parse(localStorage.getItem("User"));

const register = async (userData) => {
  const response = await axios.post("/api/users/register", userData);

  if (response.data) {
    localStorage.setItem("User", JSON.stringify(response.data));
  }
  return response.data;
};
//Login User To Backend
const login = async (userData) => {
  const response = await axios.post("/api/users/login", userData);
  if (response.data) {
    localStorage.setItem("User", JSON.stringify(response.data));
  }
  return response.data;
};
const logOut = () => {
  try {
    localStorage.removeItem("User");
    localStorage.removeItem("userProfile");
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logOut,
  login,
};
export default authService;
