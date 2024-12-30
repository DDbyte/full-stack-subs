import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = () => {

  //states
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
 
  //useEffect-axios.get to fetch data from server
  useEffect(() => {
    personServices.getAll().then(allPersons => {
      setPersons(allPersons)
    }).catch(error => {
      console.error('Failed to fetch allPersons', error)
    })
  }, [])

  //handlers
  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleChange = (event) => {
    setNewName(event.target.value)   
  }

  const handleChangeNum = (event) => {    
    setNewNumber(event.target.value)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault()
    const actualPer = persons.find((person) => person.name === newName)
    if (actualPer) {
      const confirmUpd = window.confirm(
        `${newName} is already in the phonebook. Number update?`
      )
      if (confirmUpd) {
        const updNumber = {...actualPer, number:newNumber}
        personServices.update(actualPer.id, updNumber).then(updPerson => {
          setPersons(persons.map(
            person => person.id !== actualPer.id ? person : updPerson
          ))

          setErrorMessage(`Number updated for: ${updPerson.name}`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
         
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            // 2.17 step 12
            setErrorMessage(`Information of ${newName} has already been removed from server.`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')

            // update local state
            setPersons(persons.filter(person => person.id !== actualPer.id));
          } 
        })//catch
      } //if(confirmUpd)     
      return
    }//if(actualPer)

    const newPerson = {name: newName, number: newNumber} 

    //add person to server, update state
    personServices.create(newPerson).then(createdPer => {
      setPersons([...persons, createdPer])

      setErrorMessage(`Added: ${newName}`)
      setTimeout(() => {setErrorMessage(null)}, 5000)

      setNewName('')
      setNewNumber('')
    })   
  }//end handleSubmit

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      personServices.remove(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  //filter persons based on search input
  const filteredPersons = persons.filter(
    person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

  return (    
    <>      
      <h2>Phonebook</h2>
      <Filter search={search} onSearchChange={handleChangeSearch} />
      
      <h2>Add New Person</h2>
      <Notification message={errorMessage} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onChange={handleChange}
        onChangeNum={handleChangeNum}
        onAddPerson={handleSubmit}
      />                
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />           
      ...
      <Footer/>
    </>
    
  )
}

export default App