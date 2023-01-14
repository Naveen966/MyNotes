import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/mainContent.css";
import Notes from "./Notes";
import noteContext from "../../context/noteContext/noteContext";
import EditNote from "./EditNote";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";
import authContext from "../../context/authentication/authContext";
import NoteViewer from "./NoteViewer";

const MainContent = (prop) => {
  const navigate = useNavigate();
  const { notes, getAllNotes, editNote } = useContext(noteContext);
  const { getUser } = useContext(authContext);

  let [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Edit Note
  const EditNoteValue = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
      getAllNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [buttonStatus, setButtonStatus] = useState(true);
  let handler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

    // would notes be saved or not saved
    if (note.etitle.length > 2 && note.edescription.length > 15) {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
  };

  // Get Note Details To Show
  const refOfNoteDetails = useRef(null);
  const [userNote, setUserNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const userNoteShower = (clickedNote) => {
    refOfNoteDetails.current.click();
    setUserNote({
      title: clickedNote.title,
      description: clickedNote.description,
      tag: clickedNote.tag,
    });
  };

  return (
    <>
      <Settings displayDetails={prop.displayDetails} />
      <EditNote
        reference={ref}
        handler={handler}
        noteState={note}
        EditNoteValue={EditNoteValue}
        buttonStatus={buttonStatus}
      />

      {/* Note Viewer */}
      <NoteViewer userNote={userNote} reference={refOfNoteDetails} />

      {/* Main Body */}
      <div className="mainContent">
        <div className="innerDivOfMainContent">
          {notes.map((notes) => {
            return (
              <Notes
                notes={notes}
                key={notes._id}
                updateNote={updateNote}
                userNoteShower={userNoteShower}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainContent;
