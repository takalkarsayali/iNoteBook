import React, { useState } from 'react'

import noteContext from './noteContext';

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const initialNotes = []

    const[notes,setNotes] = useState(initialNotes);

    //1. Get all note
        //API call
        const getNotes = async()=>{
          const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            },
          });
         const json = await response.json();
         setNotes(json);
        }

    //2. Add a note
        //API call
        const addNote = async(title, description, tag)=>{
          const response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            },
            
            body: JSON.stringify({title,description,tag})
          });
          //Logic to add note
          const note = await response.json();
          setNotes(notes.concat(note))
        }

    //3. Delete a note
        const deleteNote = async (id)=>{
          const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            },
          });
          const json = response.json()
          //console.log("Deleting the note with id : " + id);
          const newNotes = notes.filter((note)=>{return note._id !== id});
          setNotes(newNotes);
        }

    //4. Edit a  note
    
        //API call
        const editNote = async (id,title,description,tag)=>{
          const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            },
            
            body: JSON.stringify({title,description,tag})
          });
          //const json = response.json()

          //Logic to edit a note
          let newNote = JSON.parse(JSON.stringify(notes));
          for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id === id){
              newNote[index].title=title;
              newNote[index].description = description;
              newNote[index].tag = tag;
              break;
            }
            setNotes(newNote);
          }
        }
    return(
        <noteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children};
        </noteContext.Provider>
    )
}


export default NoteState;