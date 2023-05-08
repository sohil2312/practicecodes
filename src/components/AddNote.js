import React from 'react'
import Notes from "./Notes";
import NoteContext from '../Contexts/Notes/NoteContext';
import { useContext,useState } from 'react';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote}= context
    const [note, setNote] = useState({title:"",discription:"",tag:"default"})
    const handleClick =async (e)=>{
        e.preventDefault();
       await addNote(note.title.toString(),note.discription.toString(),note.tag.toString());
      
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]:[e.target.value]})
      }
      return (
        <div>
        <div>
          
          <h1>
            Add Notes
          </h1>
          <form className="container">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" >
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={onChange}
              />
              
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" onChange={onChange}>
                Discription
              </label>
              <input
                type="text"
                className="form-control"
                id="discription"
                name="discription"
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
              Submit
            </button>
          </form>
        </div>
       
        </div>
        
      
      );
      
}

export default AddNote