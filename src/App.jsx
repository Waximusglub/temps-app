import { useWeather } from "./hooks/useWeather";
import './App.css'


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

  const commitHash = __COMMIT_HASH__;

  return (
    <div className="app-container">

      <div className="nav">
        <div className="nav-header">

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
            placeholder='Write the City... '

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
      </div>

      <div className="main">
        {loading ? (
          <div className="loading-screen" >
            <div className="loader-wheel">
            </div>
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="error-screen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7" /></svg>
            <p>{error}</p>
          </div>
        ) : weather ? (
          <div className="weather">

            <div className="current-weather">
              <div className='weather-card'>

                <div className='weather-card__header'>
                  <h2>{weather.current.condition.text}</h2>
                  <p>{weather.location.localtime}</p>
                </div>
                <div className='weather-card__temperature'>
                  <p>{Math.round(weather.current.temp_c)}</p>

                </div>

              </div>

              <div className='weather-details'>

              </div>

            </div>

          </div>
        ) : null}
      </div>

      <footer className="footer">
        <div className="footer__left">
          <p>© 2025 Sergi Florensa Rojo</p>
        </div>



        <div className="footer__right">
          <a
            href="https://github.com/Waximusglub/temps-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {commitHash}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,14C9.64,14 8.54,15.35 8.18,16.24C9.25,16.7 10,17.76 10,19A3,3 0 0,1 7,22A3,3 0 0,1 4,19C4,17.69 4.83,16.58 6,16.17V7.83C4.83,7.42 4,6.31 4,5A3,3 0 0,1 7,2A3,3 0 0,1 10,5C10,6.31 9.17,7.42 8,7.83V13.12C8.88,12.47 10.16,12 12,12C14.67,12 15.56,10.66 15.85,9.77C14.77,9.32 14,8.25 14,7A3,3 0 0,1 17,4A3,3 0 0,1 20,7C20,8.34 19.12,9.5 17.91,9.86C17.65,11.29 16.68,14 13,14M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M17,6A1,1 0 0,0 16,7A1,1 0 0,0 17,8A1,1 0 0,0 18,7A1,1 0 0,0 17,6Z" /></svg>
          </a>
        </div>
      </footer>

    </div>

  )
}

