import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);

    if(persons.map((person) => person.name).find(name => name === newName.trim())){
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    const person = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1
    }
    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <form onSubmit={addName}>
        <div>
          name: <input id = {newName} value={newName} onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input id = {newNumber} value={newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key = {person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App