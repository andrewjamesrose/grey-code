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
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
      <div>
        <Display counter={counter}/>
        
        <Button
          handleClick={increaseByOne}
          text='plus'
        />

        <Button
          handleClick={setToZero}
          text='zero'
        />    

        <Button
          handleClick={decreaseByOne}
          text='minus'
        />           

      </div>
    )
  }

  //abstract the app's components into reuseable react components
  // const Display = (props) => {
  //   return (
  //     <div>{props.counter}</div>
  //   )
  // }

  // const Button = (props) => {
  //   return (
  //     <button onClick={props.handleClick}>
  //       {props.text}
  //     </button>
  //   )
  // }

  //reactor the components to use destructured arguments:
  const Display = ({ counter }) => <div>{counter}</div>
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  
  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )
