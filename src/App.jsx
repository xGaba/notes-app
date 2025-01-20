import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    console.log(newNote);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <Note />
      <Footer />
    </div>
  );
}

export default App;
