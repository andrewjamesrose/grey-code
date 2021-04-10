import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
//note that we don't import notes.js, simply "notes"
//the functions within that module can then be called via referencing the noteService
//namespace: eg.    noteService.getAll()
import Notification from './components/Notification'


const App = () => {
  //setting up the statehooks
  // note, the name of the "variable" is the 1st argument
  // the name of the update handler is the 2nd arguments
  // these stateful variables must be updated via the handler function
  // (and NOT by directly setting myVariable = 'foo')
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        console.log('promise fulfilled')
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(response => {
        console.log(response)
        
        //by including a state update here then the App redraw is triggered
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  //function definition used later in the code
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  //this code is run every time the app is re-rendered
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    //console.log('importance of ' + id + ' needs to be toggled')
    console.log(`importance of ${id} needs to be toggled`)


    //here the 'notes' variable is the one stored as a global 'state' at the top of the component
    const note = notes.find(n => n.id === id)

    //here ...note is creating a direct copy of all the properties of note
    // the second argument is setting the importance and flipping its value
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      //for each note in the notes array. If the note.id isn't the "id" of interest then copy the old value
      //if the value is the id of interest, then replace the value with the new value from the API response
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* sets the show all state hook using the callback */}
        <button onClick={() => setShowAll(!showAll)}>

          {/* this is very neat: the string is conditionally generated based on the showAll state: */}
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map((note,i) => 
            <Note
              key={i}
              note={note} 

              //nb each instance of a note is given its own event handler
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App