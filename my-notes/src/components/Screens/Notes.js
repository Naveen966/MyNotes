import React, { useContext } from "react";
import "../Styles/notes.css";
import noteWritingPageContext from "../../context/appFunctionalities/noteWritingPageContext";
import noteContext from "../../context/noteContext/noteContext";

const Notes = (props) => {
  let { notes, updateNote, userNoteShower } = props;

  const noteEditButton = () => {
    updateNote(notes);
  };

  // To Open Note Viewer
  const noteDetails = () => {
    userNoteShower(notes);
  };
  const {
    noteViewerDisplayDecider,
    deletionPageDisplayDecider,
    deletionDisplayProperty,
  } = useContext(noteWritingPageContext);

  const { deleteNote } = useContext(noteContext);
  return (
    <>
      {/* Deletion Conformation Page */}
      {/* Model */}
      <div
        style={{ display: deletionDisplayProperty }}
        className="upperLayerOfDeletionPage"
      >
        <div className="profileOptionContainerOfDeletionPage">
          <div className="insideUpperLayerOfDeletionPage">
            <div className="profileModelCutOfDeletionPage">
              <span
                className="material-symbols-outlined"
                onClick={deletionPageDisplayDecider}
              >
                close
              </span>
            </div>
            <h1 className="deletionHeader">
              Are You Sure? You want to <b>delete</b> This <b>Note</b>.
            </h1>
          </div>
          <div className="deletionOption">
            <div className="no">
              <button
                className="deletionBtn"
                onClick={deletionPageDisplayDecider}
              >
                NO
              </button>
            </div>
            <div className="yes">
              <button
                className="deletionBtn"
                onClick={() => {
                  deleteNote(notes._id);
                  deletionPageDisplayDecider();
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end */}

      {/* Main Body */}
      <div className="outerLayerOfNote">
        <div className="upperPart" onClick={noteDetails}>
          {/* Title */}
          <div className="headingOfNote">
            <h3
              onClick={noteViewerDisplayDecider}
              className="headerOfNote text"
            >
              {notes.title}
            </h3>
          </div>
          <div className="descriptionBody">
            {/* Description */}
            <div className="descriptionOfNote">
              <p onClick={noteViewerDisplayDecider} className="description">
                {notes.description}
              </p>
            </div>
          </div>
          <span style={{ display: "none" }}>{notes.tag}</span>
        </div>
        <div className="lowerPart">
          {/* Tag Category */}
          <div className="category">
            <span onClick={noteViewerDisplayDecider} className="tag">
              {notes.tag}
            </span>
          </div>
          <div className="lowerPart">
            {/* Edit Button */}
            <div className="editNote">
              <span
                className="material-symbols-outlined"
                onClick={noteEditButton}
              >
                border_color
              </span>
            </div>

            {/* Delete Button */}
            <div className="deleteNote">
              <span
                className="material-symbols-outlined"
                onClick={deletionPageDisplayDecider}
              >
                delete
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
