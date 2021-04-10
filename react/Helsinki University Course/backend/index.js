const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

//event handler is set up for quen a request hits the server. the event handler is "response" 
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    // const id = request.params.id
    // the above version doesn't work as the id in the request is parsed as a string
    // we must cast it to a number

    const id = Number(request.params.id)

    // console.log(id)
    // const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    //     note.id === id
    // })
    // console.log(note)
    // response.json(note)

    const note = notes.find(note => {
        //console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        // if doing a multi-line function you need to explicitly define the true/false return
        return note.id === id
    })

    //interesting use of if, see: https://stackoverflow.com/questions/5113374/javascript-check-if-variable-exists-is-defined-initialized
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }

  })

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})