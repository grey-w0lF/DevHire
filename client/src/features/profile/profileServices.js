import axios from "axios";

const updateProfile = async (updateData) => {
  const UserData = JSON.parse(localStorage.getItem("User"));
  const response = await axios.patch(
    "/api/profile/create-profile",
    updateData,
    {
      headers: {
        Authorization: `Bearer ${UserData.token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response) {
    console.log(response);
  }
};

const getProfile = async () => {
  const UserData = JSON.parse(localStorage.getItem("User"));
  console.log(UserData);
  const response = await axios.get("/api/profile/my-profile", {
    headers: {
      Authorization: `Bearer ${UserData.token}`,
    },
  });
  if (response.data) {
    localStorage.setItem("userProfile", JSON.stringify(response.data));
  }

  return response.data;
};

const getAllProfile = async () => {
  const response = await axios.get("/api/profile/all-profiles");
  if (response.data) {
  }

  return response.data;
};
const getDevProfileById = async (userId) => {
  const response = await axios.get(`/api/profile/dev/${userId}`);
  if (response.data) {
  }

  return response.data;
};

const profileServices = {
  updateProfile,
  getProfile,
  getAllProfile,
  getDevProfileById,
};
export default profileServices;
