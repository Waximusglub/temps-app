import { useWeather } from "./hooks/useWeather";
import './App.css'

import cardImage from "./assets/card_s.png";
import cardImagec from "./assets/card_c.png";
import cardImager from "./assets/card_r.png";

export default function App() {
  const {
    location,
    setLocation,
    weather,
    loading,
    error,
    fetchByLocation,
    fetchByGeo,
  } = useWeather();

  const getCardImage = (text) => {
    if (text.includes("rain")) return cardImager;
    if (text.includes("cloud")) return cardImagec;
    return cardImage;
  };

  return (
    <div className="app-container">

      <div className="nav">
        <button
          onClick={fetchByGeo}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
          </svg>

        </button>
        <input
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Escriu una ciutat... '

        ></input>
        <button
          onClick={fetchByLocation}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>

        </button>
      </div>


      {loading ? (
        <div className="loading-screen">
          <p>Carregant dades del temps...</p>
        </div>
      ) : error ? (
        <div>

        </div>
      ) : weather ? (
        <div className="weather">

          <div className="current">
            <div className='weather-card' style={{ backgroundImage: `url(${cardImage})`, backgroundSize: "cover", backgroundPositionX: "center",  }}>
            
            <div className='card-title'>
              <h2>{weather.current.condition.text}</h2>
              <p>{weather.location.localtime}</p>
            </div>
            <div className='card-info'>
              <p>{Math.round(weather.current.temp_c)}</p>
              
            </div>

          </div>
          </div>

          <div className="forecast">
            {weather.forecast.forecastday.slice(1).map((day,i) => (
              <div
                key={i}
                className="weather-card"
                style={{
                  backgroundImage: `url(${getCardImage(day.day.condition.text.toLowerCase())})`,
                  backgroundPositionX: "center",
                  backgroundPositiony: "y-end",
                  backgroundSize: "cover",
                }}
              >
                <div className="card-title">
                  <h2>{day.day.condition.text}</h2>
                  <p>{day.date}</p>
                </div>
                <div className="card-info">
                  <p>{Math.round(day.day.avgtemp_c)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>

  )
}

