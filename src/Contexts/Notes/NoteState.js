import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesinit = [];
  const [notes, setNotes] = useState(notesinit);
  //Fetch all note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      },
    });
    const json = await response.json(); 
    console.log(json)
    setNotes(json);
    console.log(localStorage.getItem('authToken'))
  };

  const addNote = async (title, discription, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('authToken'),
      },
      body: JSON.stringify({"title":title,"discription":discription,"tag":tag}),
    });
  
    const note = await response.json();
    console.log(notes.concat(note))

    setNotes(notes.concat(note));
  };
  //delete a note
  const editNote = async (id,title,discription,tag) =>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Accept":'application/json',
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('authToken'),
      },
      body: JSON.stringify({"title":title,"discription":discription,"tag":tag}),
    
    });
    let newNote = JSON.parse(JSON.stringify(notes));
    for(let index=0; index<newNote.length;index++){
      const element = newNote[index];
      if(element._id===id){
        newNote[index].title = title;
        newNote[index].discription = discription;
        newNote[index].tag = tag;
        break;
      }
      
      
    }
    setNotes(newNote)
  }
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Accept":'application/json',
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(
      notes.filter((notes) => {
        return notes._id !== id;
      })
    );
  };
  
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes,editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
