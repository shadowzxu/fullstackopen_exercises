import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //fetch the initial state of persons data from json-server
  useEffect(() => {
    // console.log('effect');

    const eventHandler = response => {
      // console.log('promise fullfilled');
      setPersons(response.data);
    }

    const promise = axios.get('http://localhost:3001/persons');
    promise.then(eventHandler)
  }, [])

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
    // setPersons(persons.concat(person));
    // setNewName('');
    // setNewNumber('');
    axios
      .post('http://localhost:3001/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data))
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
        onSubmit = {addName} 
        name = {newName} handleNameChange = {handleNameChange} 
        number = {newNumber} handleNumberChange = {handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons = {fillteredPersons} />
    </div>
  )
}

export default App