import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersFromLocalStorage,
  getCurrentUserFromLocalStorage,
  saveCurrentUserToLocalStorage,
  saveUsersToLocalStorage,
  removeCurrentUserFromLocalStorage,
} from "../utils/index"; 

const initialState = {
  user: getCurrentUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const users = getUsersFromLocalStorage();
      const existingUser = users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (existingUser) {
        state.user = existingUser;
        saveCurrentUserToLocalStorage(existingUser);
      } else {
        alert("Invalid username or password");
      }
    },
    register: (state, action) => {
      const users = getUsersFromLocalStorage();
      const newUser = {
        username: action.payload.username,
        password: action.payload.password,
      };

      users.push(newUser);
      saveUsersToLocalStorage(users);
      state.user = newUser;
      saveCurrentUserToLocalStorage(newUser);
    },
    logout: (state) => {
      state.user = null;
      removeCurrentUserFromLocalStorage();
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
