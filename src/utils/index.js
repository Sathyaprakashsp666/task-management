export const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const getCurrentUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
};

export const saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const removeCurrentUserFromLocalStorage = () => {
  localStorage.removeItem("currentUser");
};
