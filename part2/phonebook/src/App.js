import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //fetch the initial state of persons data from json-server
  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const addPerson = (event) => {
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

    personService
      .create(person)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('');
        setNewNumber('');
      })
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
        onSubmit = {addPerson} 
        name = {newName} handleNameChange = {handleNameChange} 
        number = {newNumber} handleNumberChange = {handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons = {fillteredPersons} />
    </div>
  )
}

export default App