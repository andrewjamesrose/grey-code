import React from 'react'
import ReactDOM from 'react-dom'

//ECMA6 style function definition
//React components must always be capitalised
// const Hello = (props) => {

//it's possible to do the destrcturing in the definition of the constructor
const Hello = ({ age, name}) => {
  
  //extract the properties to local variables as follows:
  // const name = props.name
  // const age = props.age

  //an even easier way us to do this "unpacking" in a single destructuring line:
  //this is functionally the same as the above but achieves it in a single line
  // const {age, name} = props
  
  
  //it is possible to define helper functions which can be called within the constructor
  // const bornYear = () => {
  //   const yearNow = new Date().getFullYear()
  //   return yearNow - age
  // }

  //refactor in to a single line
  const bornYear = () => new Date().getFullYear()

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}


const App = () => {
  const name = 'Peter'
  const age = 10
  //note, these <> and </> empty tags are valid and render well
  return(
    <>
      {/* JSX component calls need to be closed with the trailing / before > */}
      {/* It's possible to use javascript functions to generate the prop passed to the Component */}
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  )
}

// render what, where
//note that the app being rendered has to contain at least one root element (eg a div)
// these root tags can be empty JSX tags of the form : <> and </>
ReactDOM.render(<App />, document.getElementById('root'))