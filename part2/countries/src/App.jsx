import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCoun, setFilteredCoun] = useState([])
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  useEffect(() => {
    if (search) {
      const searchFilter = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCoun(searchFilter)
    } else {
      setFilteredCoun([])
    }
  }, [search, countries])

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    setShowCountry(null) 
  }

  const handleShowButton = (country) => setShowCountry(country)

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <input
          placeholder="Enter Country"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      {showCountry ? (
        <CountryDetails country={showCountry} />
      ) : (
        <Countries countries={filteredCoun} handleShowButton={handleShowButton} />
      )}
    </div>
  )
}

export default App