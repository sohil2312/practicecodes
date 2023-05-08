import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../Contexts/Notes/NoteContext";
import Noteitems from "./Noteitems";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('authToken')){
    getNotes();
    }else{
      navigate('/login')
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:'',etitle:'',ediscription:'',etag:''})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,ediscription:currentNote.discription,etag:currentNote.tag})
  };
  
  const handleClick =async (e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.ediscription,note.etag);
    refClose.current.click();
   
}
const onChange =(e)=>{
  setNote({...note, [e.target.name]:e.target.value})
   
  }
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                    onChange={onChange}
                  >
                    Discription
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ediscription"
                    name="ediscription"
                    onChange={onChange}
                    value={note.ediscription}
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>You Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitems note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
