import React, { useState } from "react";
import noteContext from "./noteContext";
import { toast } from "react-toastify";

const NoteInfo = (props) => {
  // const host = "http://localhost:5000/";
  let initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [symbol, setSymbol] = useState(false);

  // Notification
  const notifyA = (success) => toast.success(success);
  const notifyB = (error) => toast.error(error);
  function notification(data) {
    if (data.success) {
      notifyA(data.msg);
      setNotes(notes.concat(data.success));
    } else if (data.errors) {
      notifyB(data.errors[0].msg);
    } else {
      notifyB(data.error);
    }
  }

  // Get all Notes
  const getAllNotes = async () => {
    setNotes([]);
    const res = await fetch(`/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setNotes(notes.concat(data));
  };

  // Add a new Note
  const addNewNote = async (title, description, tag) => {
    // TODO:- API Call
    const res = await fetch(`/api/notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const data = await res.json();
    notification(data);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // TODO:- API Call
    const res = await fetch(`/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const data = await res.json();

    notes.forEach((name, index) => {
      if (name._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    });

    let newNote = JSON.parse(JSON.stringify(notes));

    if (data.success) {
      notifyA(data.msg);
      setNotes(newNote);
    } else if (data.errors) {
      notifyB(data.errors[0].msg);
    } else {
      notifyB(data.error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // TODO:- API Call
    const res = await fetch(`/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setNotes(notes.concat(data));

    const newNotes = notes.filter((note) => note._id !== id);

    if (data.success) {
      notifyA(data.msg);
      setNotes(newNotes);
    } else if (data.errors) {
      notifyB(data.errors[0].msg);
    } else {
      notifyB(data.error);
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNewNote,
        deleteNote,
        editNote,
        getAllNotes,
        symbol,
        setSymbol,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteInfo;
