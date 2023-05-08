import React, { useContext } from 'react'
import NoteContext from '../Contexts/Notes/NoteContext';


const Noteitems = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;
    const handleDelete = (e)=>{
        e.preventDefault();
        deleteNote(note._id);
        
    }
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                <i className="fa-solid fa-user-pen mx-3" onClick={()=>{updateNote(note)}}></i>
                </div>
                <p className="card-text">{note.discription}</p> 
                </div>
            </div>
        </div>
    )
}

export default Noteitems