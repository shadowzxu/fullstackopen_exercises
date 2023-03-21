import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({content: null, type:'INFO'})

  //fetch the initial state of persons data from json-server
  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);

    if(newName.length === 0){
      return;
    }

    let person = persons.find(p => p.name === newName.trim());
    if(person != null){
      if(window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)){
        const newPerson = {...person, number: newNumber }
        personService
          .update(person.id, newPerson)
          .then((data) => {
            // console.log("update :", person);
            setPersons(persons.map(p => p.id !== person.id ? p : data))
            setNewName('')
            setNewNumber('')

            setMessage({content: `Updated ${person.name}`, type: 'INFO'})
            setTimeout(() => {
              setMessage({content: null, type: 'INFO'})
            }, 3000)
          })
      }
      
      return;
    }
    
    person = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1 + Date.now()
    }

    personService
      .create(person)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('');
        setNewNumber('');
        
        setMessage({content: `Added ${person.name}`, type: 'INFO'})
        setTimeout(() => {
          setMessage({content: null, type: 'INFO'})
        }, 3000)
      })
  }

  const deletePerson = (event) => {
    event.preventDefault();
    // console.log('button clicked', event.target);

    if(window.confirm(`Delete ${event.target.name}?`)){
      personService.deletePerson(event.target.id)
      .then(() => {
        personService.getAll().then(persons => {
          setPersons(persons)
        })
      })
      .catch((error) => {
        setMessage({content: `Information of ${event.target.name} has already been removed from server`, type: 'ERROR'})
        setTimeout(() => {
          setMessage({content: null, type: 'INFO'})
        }, 3000)
      })
  }
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
      <Notification message = {message.content} type = {message.type} />
      {/* <div>debug: {newName}</div> */}
      <Filter filter = {newFilter} handleFilterChange = {handleFilterChange}/>
      
      <h3>add a new</h3>
      
      <PersonForm 
        onSubmit = {addPerson} 
        name = {newName} handleNameChange = {handleNameChange} 
        number = {newNumber} handleNumberChange = {handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons = {fillteredPersons} handleClickDeletePerson = {deletePerson}/>
    </div>
  )
}

export default App