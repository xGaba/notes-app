import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import RegisterPage from "./RegisterPage";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => console.log("Error fetching notes: ", error));
  });

  function addNote(newNote) {
    setNotes((prevNotes)=> {
      return [...prevNotes, newNote]
    })
  }

  function deleteNote(id) {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => {
            return note.id !== id;
          });
        });
      })
      .catch((error) => console.log("Error deleting note: ", error));
  }

  return (
    <div>
      <Header />
      <RegisterPage />
      {/* <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note.id}
            title={note.title}
            content={note.content}
            delete={deleteNote}
          />
        );
      })} */}
      <Footer />
    </div>
  );
}

export default App;
