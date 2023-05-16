import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      username: "",
      imagePath: "",
      isAdmin: false,
      bio: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        username: "",
        imagePath: "",
        isAdmin: false,
        bio: "",
      };
    },
  },
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;

export function loginUser(data) {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:8002/auth/login", data);
    if (response.data.success) {
      console.log(response.data);
      dispatch(setUser(response.data.data));
      localStorage.setItem("user_token", response.data.token);
      alert("im success");
    } else {
      alert(response.data.message);
    }
  };
}

export function checkLogin(token) {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:8002/auth/check-login",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setUser(response.data.data));
  };
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(resetUser());
    localStorage.removeItem("user_token");
  };
}
