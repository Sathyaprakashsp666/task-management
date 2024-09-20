/**
 * Retrieves the list of users from localStorage.
 * @returns {Array} - An array of users, or an empty array if none exist.
 */
export const getUsersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

/**
 * Retrieves the currently logged-in user from localStorage.
 * @returns {Object|null} - The current user object, or null if no user is logged in.
 */
export const getCurrentUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
};

/**
 * Saves the current user to localStorage.
 * @param {Object} user - The user object to save.
 */
export const saveCurrentUserToLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

/**
 * Saves the list of users to localStorage.
 * @param {Array} users - The array of users to save.
 */
export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

/**
 * Removes the current user from localStorage.
 */
export const removeCurrentUserFromLocalStorage = () => {
  localStorage.removeItem("currentUser");
};
