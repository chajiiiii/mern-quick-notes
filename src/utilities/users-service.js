// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);

  // TODO, return user object from token instead
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);

  return token;
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem will return null if the key does not exist
  const token = localStorage.getItem("token");

  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  // A JWT's express is expressed in seconds, not millieseconds
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}
