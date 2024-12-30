
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  const APIKey =  import.meta.env.VITE_SOME_KEY


  // fetch weather data for the capital 
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherstack.com/current?access_key=${APIKey}&query=${encodeURIComponent(country.capital[0])}`
        )
        if (response.data.error) {
          setError(response.data.error.info || 'Error fetching weather data.')
          setWeatherData(null);
        } else {
          setWeatherData(response.data)
          setError('')
        }
      } catch (err) {
        console.error(err);
        setError('Unable to fetch weather data.')
        setWeatherData(null);
      }
    }

    fetchWeather();
  }, [country, APIKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: <strong>{country.capital}</strong></p>
      <p>Area: {country.area}</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {/* weather Information */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData?.location && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <img
            src={weatherData?.current?.weather_icons?.[0] || ''}
            alt={weatherData?.current?.weather_descriptions?.[0] || 'Weather description'}
          />
          <p>
            <strong>Temperature:</strong> {weatherData?.current?.temperature}°C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData?.current?.weather_descriptions?.[0]}
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData?.current?.wind_speed} km/h
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData?.current?.humidity}%
          </p>
        </div>
      )}
    </div>
  )
}

export default CountryDetails