import React, { useContext, useState } from "react";
import "../Styles/noteViewer.css";
import noteWritingPageContext from "../../context/appFunctionalities/noteWritingPageContext";

const NoteViewer = (props) => {
  const { userNote, reference } = props;

  const { noteViewerDisplayDecider, displayProperty } = useContext(
    noteWritingPageContext
  );

  //   Text Aligning
  const [textAlignment, setTextAlignment] = useState("left");

  return (
    <>
      <div>
        <div
          className="paperCover"
          style={{ display: displayProperty }}
          ref={reference}
        >
          <div className="paper">
            <div className="noteViewerComplexHeader">
              <div className="cutButtonOfNoteViewer">
                <span
                  onClick={noteViewerDisplayDecider}
                  className="material-symbols-outlined"
                >
                  close
                </span>
              </div>

              {/* Head */}
              <div className="headingOfNoteViewer">
                <h2 className="headerOfNoteViewer">{userNote.title}</h2>
              </div>
            </div>

            {/* Middle Part */}
            <div className="contextOfNoteViewer">
              <p
                className="mainContentOfNoteViewer"
                style={{ textAlign: textAlignment }}
              >
                {userNote.description}
              </p>
            </div>

            {/* Bottom Part */}
            <div className="categoriesOfNoteViewer">
              <div className="alignment">
                <button
                  className="alignText"
                  onClick={() => {
                    setTextAlignment("left");
                  }}
                >
                  Align Left
                </button>
                <button
                  className="alignText"
                  onClick={() => {
                    setTextAlignment("center");
                  }}
                >
                  Align Center
                </button>
                <button
                  className="alignText"
                  onClick={() => {
                    setTextAlignment("right");
                  }}
                >
                  Align Right
                </button>
              </div>
              <h6 className="categoryOfNoteViewer">{userNote.tag}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteViewer;
