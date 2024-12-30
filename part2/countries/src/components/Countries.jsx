
import CountryDetails from "./CountryDetails"

const Countries = ({ countries, handleShowButton }) => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter.</p>
    }
    if (countries.length === 1) {
      return <CountryDetails country={countries[0]} />
    }
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.ccn3}>
            {country.name.common}
            <button onClick={() => handleShowButton(country)}>Show</button>
          </li>
        ))}
      </ul>
    )
  }

  export default Countries