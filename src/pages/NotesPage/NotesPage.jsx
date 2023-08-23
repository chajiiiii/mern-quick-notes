import { useState, useEffect } from "react";
import { fetchNotes, addNote } from "../../utilities/notes-api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotesData = async () => {
    try {
      const data = await fetchNotes();
      console.log("data: ", data);
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  const handleAddNote = async (noteContent) => {
    try {
      const response = await addNote({ text: noteContent });
      console.log("Response:", response);
      console.log("Note Content:", noteContent);
      fetchNotesData();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h1>My Notes</h1>
      <textarea
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note here"
      />
      <button onClick={() => handleAddNote(newNote)}>Add Note</button>
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <p>{note.text}</p>
              <p>{note?.createdAt.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
