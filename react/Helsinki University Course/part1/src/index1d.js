import React, { useState } from 'react'
//the brackets are importing a specific function only

import ReactDOM from 'react-dom'

//ECMA6 style function definition
//React components must always be capitalised
// const Hello = (props) => {

 
  const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
  
    const handleLeftClick = () => {
      setAll(allClicks.concat('L'))
      //note the use of the concat function here
      //concat creates a copy of the allClicks state
      //and changes the reference of the allClicks pointer
      //rather than directly changing the allClicks object
      setLeft(left + 1)
    }
  
    const handleRightClick = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
    }
  
    return (
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />

      </div>
    )
  }

  const History = (props) => {
    //conditional rendering when the App attempts to render History
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }

  //reactor the components to use destructured arguments:
  const Display = ({ counter }) => <div>{counter}</div>
  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
