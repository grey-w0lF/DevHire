import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get User From LocalStorage And Add it To initial State
const User = JSON.parse(localStorage.getItem("User"));

const initialState = {
  User: User ? User : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const loginUser = createAsyncThunk("/login", async (user, thunkAPI) => {
  // console.log(user);
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logOutUser = createAsyncThunk("/logout", async () => {
  await authService.logOut();
});

export const getUserProfile = createAsyncThunk(
  "/my-profile",
  async (thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.User = action.payload;
        state.userProfile = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.User = null;
        state.userProfile = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.User = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.User = null;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Logout completed successfully";
        state.User = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "Unable To Logout";
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
