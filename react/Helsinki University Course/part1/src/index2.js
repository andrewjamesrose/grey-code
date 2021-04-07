import React, { useState } from 'react'
//the brackets are importing a specific function only

import ReactDOM from 'react-dom'

//ECMA6 style function definition
//React components must always be capitalised
// const Hello = (props) => {

 
  const App = () => {

    //set the initali state of "counter" to zero
    //this is where "state" is added to the component
    //both couner and setcounter are being passed as "destructured"
    //arguments to the useState function call
    const [ counter, setCounter ] = useState(0)
    const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

    //setTimeout callback receives two arguments:
    //setTimeout(function to call, time to call call it)
    //setCounter is defined here using arrow notation
    //setCounter takes no arguments, acts on the global variable
    
    //as a state is being modified, a re-render is triggered
    // setTimeout(
    //   () => setCounter(counter + 1),
    //   1000
    // )
  
    return (
      <div>
        <div>{counter}</div>
        {/* <button onClick={() => console.log('clicked')}> */}
        {/* button attribute is a reference to a function */}
        <button onClick={increaseByOne}>
          plus
        </button>

      {/* setting an in-line event handler */}
      {/* it's best practice to define the vent handlers as separate functions */}
      <button onClick={setToZero}>
        zero
      </button>

      </div>
    )
  }
  
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
