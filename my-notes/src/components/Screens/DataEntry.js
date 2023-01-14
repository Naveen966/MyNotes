import React, { useContext, useState } from "react";
import "../Styles/dataEntry.css";
import noteContext from "../../context/noteContext/noteContext";
import noteWritingPageContext from "../../context/appFunctionalities/noteWritingPageContext";

const DataEntry = (props) => {
  let { addNewNote } = useContext(noteContext);
  let { displayDecider } = useContext(noteWritingPageContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // Add a New Note
  const addANewNote = (e) => {
    e.preventDefault();
    addNewNote(note.title, note.description, note.tag);
    displayDecider();
    setNote({ title: "", description: "", tag: "" });
  };

  const [buttonStatus, setButtonStatus] = useState(true);
  const handler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

    // would notes be saved or not saved
    if (note.title.length > 2 && note.description.length > 15) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  };

  return (
    <>
      <div
        className="dataEntryPage"
        style={{
          display: props.displayProperty,
          opacity: props.opacityOfDataPage,
        }}
      >
        <div className="innerDataEntryPage">
          {/* Title */}
          <div className="titleInput">
            <h3>Title</h3>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handler}
            ></input>
          </div>
          {/* Description */}
          <div className="descriptionInput">
            <h3>Description</h3>
            <textarea
              id="description"
              name="description"
              value={note.description}
              onChange={handler}
            ></textarea>
          </div>

          {/* Tag*/}
          <div className="descriptionInput">
            <h3>Tag</h3>
            <input
              type="text"
              name="tag"
              id="tag"
              value={note.tag}
              onChange={handler}
            />
          </div>

          {/* Save button */}
          <div className="saveNote">
            <button
              className="noteSave"
              onClick={addANewNote}
              disabled={buttonStatus}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataEntry;
