import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [ready, setReady] = useState(false);

  async function addNote(newNote){
      try{
        const result = await axios.post(`http://localhost:3000/routes/`,newNote);
        if(result){
          console.log("Note is added to DB");
        }
        getNotes();
        
    }
    catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    }
  }

  async function deleteNote(id) {
      try{
        const result = await axios.delete(`http://localhost:3000/routes/${id}`);

        if(result){
          console.log("Note is deleted from DB");
          getNotes();
        }
      }
      catch (error) {
        console.error('A problem occurred while deleting a record: ', error);
      }
      
    }
    async function getNotes() {
      try{
        const result = await axios.get(`http://localhost:3000/routes/`);
        if(result){
          console.log("Notes are returned");
          console.log(result.data);
        }
        setNotes(result.data);
        console.log(notes);
      }
      catch (error) {
        console.error('A problem occurred while deleting a record: ', error);
      }
      
    }
    
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      getNotes();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    return (
      <div onLoad={getNotes}>
        <Header />
        <CreateArea  onAdd={addNote} />
        {notes.map((noteItem,index) => {
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    );
}

export default App;
