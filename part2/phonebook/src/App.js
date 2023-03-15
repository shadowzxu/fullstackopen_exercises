import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
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
  const [newFilter, setNewFilter] = useState('')

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

  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value);    
  }

  const fillteredPersons = newFilter ? 
    persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>debug: {newName}</div> */}
      <Filter filter = {newFilter} handleFilterChange = {handleFilterChange}/>
      
      <h3>add a new</h3>
      
      <PersonForm 
        onSubmit = {addName} 
        name = {newName} handleNameChange = {handleNameChange} 
        number = {newNumber} handleNumberChange = {handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons = {fillteredPersons} />
    </div>
  )
}

export default App