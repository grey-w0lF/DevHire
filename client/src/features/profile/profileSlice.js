import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "./profileServices";

const userProfile = JSON.parse(localStorage.getItem("userProfile"));
const initialState = {
  userProfile: userProfile ? userProfile : null,
  allProfiles: null,
  currDevProfile: null,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//  Action : Update Profile
export const updateUserProfile = createAsyncThunk(
  "/update-profile",
  async (updateData, thunkAPI) => {
    try {
      return await profileServices.updateProfile(updateData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Actions: Get The User Profile
export const getUserProfile = createAsyncThunk(
  "/my-profile",
  async (thunkAPI) => {
    try {
      return await profileServices.getProfile();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get All The Profiles From Database

export const getAllProfile = createAsyncThunk(
  "/all-profile",
  async (thunkAPI) => {
    try {
      return await profileServices.getAllProfile();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getDevProfileById = createAsyncThunk(
  "/devProfile",
  async (userId, thunkAPI) => {
    try {
      return await profileServices.getDevProfileById(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    resetProfile: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Profile Updated Sucessfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "Unable To Update The Profile";
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProfile = action.payload;
        state.message = "";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.userProfile = null;
      })
      .addCase(getDevProfileById.pending, (state, action) => {
        state.currDevProfile = null;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getDevProfileById.fulfilled, (state, action) => {
        state.currDevProfile = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getDevProfileById.rejected, (state, action) => {
        state.currDevProfile = null;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllProfile.pending, (state, action) => {
        state.isLoading = true;
        state.allProfiles = null;
      })
      .addCase(getAllProfile.fulfilled, (state, action) => {
        state.allProfiles = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllProfile.rejected, (state, action) => {
        state.allProfiles = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
