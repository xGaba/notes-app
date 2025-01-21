import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3000/note-app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onAdd(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    setNote({ title: "", content: "" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Note title"
          onChange={handleChange}
          name="title"
          value={note.title}
        ></input>
        <textarea
          placeholder="Writte your content"
          onChange={handleChange}
          name="content"
          value={note.content}
        ></textarea>
        <button type="submit">
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
