import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//nb: don't need to add the .js extension to the component import line

import axios from 'axios'


const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

//callback registered to handle the async promise response
// promise.then(response => {
//   console.log("Printing Promise 1 result:")
//   console.log(response)
// })


// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
  )
})




const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

//destructured the inputs
// const App = ({ notes } ) => {
//   // const { notes } = props

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {/* <li>{notes[0].content}</li>
//         <li>{notes[1].content}</li>
//         <li>{notes[2].content}</li> */}

//         {/* replaced with a map function to iterate
//         over the list of notes
//         as it's JSX we can embed the JS function
//         inline with the content of the JSX template */}

//         {/* note: in the above line we need a unique key in the
//         li element tag...this is critical for 
//         ReactDOM to track changes in the components/renderers*/}
        

//         {/* refactoered Note to component */}
//         {notes.map(note => 
//           <Note key={note.id} note={note} />
//         )}

//           {/* note that each Note has an ID now */}

//       </ul>
//     </div>
  // )
// }

// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)