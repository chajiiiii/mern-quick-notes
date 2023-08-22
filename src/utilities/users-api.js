import sendRequest from "./send-request";
const BASE_URL = "/api/users";

export async function signUp(userData) {
  // Before writing send-request
  //   // Fetch uses an options object as a second argument
  //   // to make requests other than GET, include date, set headers.
  //   const res = await fetch(BASE_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(userData),
  //   });
  //   // Check if request was successful
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     throw new Error("Invalid Sign Up");
  //   }
  //   After writing send-request
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  // Before writing send-request
  //   const res = await fetch(`${BASE_URL}/login`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(credentials),
  //   });
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     throw new Error("Invalid Log In");
  //   }
  //   After writing send-request
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
