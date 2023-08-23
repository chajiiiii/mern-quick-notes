import sendRequest from "./send-request";

const BASE_URL = "/api/notes";

export async function fetchNotes() {
  return sendRequest(BASE_URL);
}

export async function addNote(noteData) {
  return sendRequest(BASE_URL, "POST", noteData);
}
