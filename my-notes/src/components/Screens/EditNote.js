import React from "react";

const EditNote = (props) => {
  const { noteState, reference, handler, EditNoteValue, buttonStatus } = props;

  return (
    <>
      <button
        ref={reference}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {/* start of form */}
              <div className="innerDataEntryPage">
                {/* Title */}
                <div className="titleInput">
                  <h3>Title</h3>
                  <input
                    type="text"
                    id="title"
                    name="etitle"
                    value={noteState.etitle}
                    onChange={handler}
                  ></input>
                </div>
                {/* Description */}
                <div className="descriptionInput">
                  <h3>Description</h3>
                  <textarea
                    id="description"
                    name="edescription"
                    value={noteState.edescription}
                    onChange={handler}
                  ></textarea>
                </div>

                {/* Tag*/}
                <div className="descriptionInput">
                  <h3>Tag</h3>
                  <input
                    type="text"
                    name="etag"
                    id="tag"
                    value={noteState.etag}
                    onChange={handler}
                  />
                </div>

                {/* Save button */}
                <div className="saveNote">
                  <button
                    disabled={buttonStatus}
                    className="noteSave"
                    data-bs-dismiss="modal"
                    onClick={EditNoteValue}
                  >
                    Save Note
                  </button>
                </div>
              </div>
              {/* end of form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNote;
