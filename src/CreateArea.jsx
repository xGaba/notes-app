import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return [{ ...prevNote, [name]: value }];
    });
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
        ></input>
        <textarea
          placeholder="Writte your content"
          onChange={handleChange}
          name="content"
        ></textarea>
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
