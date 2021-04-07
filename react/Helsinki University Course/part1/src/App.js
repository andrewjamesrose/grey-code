import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {

    //useState syntax of:
    // const [myVariable, myUpdate function] = initialState of myVariable
    const [notes, setNotes] = useState(props.notes)

    //add new state for new Notes:
    //this syntax is the definition of both:
    // 1) The state variable name in code
    // 2) The update function logic which is called
    //     when we run setNewNote('foo')
    //this is also the function definition of setNewNote
    //if we want to set the value of "newNote"
    const [newNote, setNewNote] = useState(
        'a new note...'
      ) 

    const [showAll, setShowAll] = useState(true)
    
    const addNote = (event) => {
        event.preventDefault()
        //immediately call preventDefault before proceding

        console.log('button clicked', event.target)
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
          }
        
          //the his updates the state of notes
          //this is permitted state manipulation because the 
          //concat function copies the array and only modifies the
          //the reference
          setNotes(notes.concat(noteObject))
          setNewNote('')

          //updating the "notes" state changes a state in App
          //this triggers the redraw of the app
          //the redraw is based on the new state and hence
          //elements are added to the list on screen

      }

    const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
    }
    
    
    //note the conditional operator syntax here
    // "result = condition ? valIfTrue: valIfFalse"
    
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)
    //i.e. if notesToShow === true, then return the whole notes array
    //  if not, return the filtered list where only the important notes
    //  are included in the returned list
    

  return (
    <div>
      <h1>Notes</h1>
      <ul>
      {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
            value={newNote} 
            // if no event handler is provided here, the input field
            //cannot be edited as the field would otherwise be a 
            //direct manipulation of the app's state and this is not
            //permitted. stateChanges must be handled by event handlers
            //using set state declarations
            //
            // this is "registering an event handler"
            onChange={handleNoteChange}

            //as an onchange function, the event is fired at each change
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App