import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => (
      {...prevNote, [name]: value }
    ));
  }

  function handleClick(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({ title: "", content: "" });
  }

  return (
    <div>
      <form>
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
        <button onClick={handleClick}><AddIcon /></button>
      </form>
    </div>
  );
}

export default CreateArea;
