import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faCloudSun, faCloudRain, faCloudShowersHeavy, faSnowflake, faCloudBolt, faMoon } from '@fortawesome/free-solid-svg-icons'

const date = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      backgroundLabel: "Rocky Mountain National Park"
    }
    this.getWeatherIcon = this.getWeatherIcon.bind(this);
  }

  componentDidMount() {
    let weatherJSON = {}

    //Get GPS coordinates
    let latitude = 0;
    let longitude = 0;
    navigator.geolocation.getCurrentPosition(async (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      //Construct URL for first API call
      const url = `https://api.weather.gov/points/${latitude},${longitude}`

      try {
        // Make initial API call to get local weather office and grid position
        const response = await fetch(url);
        const json = await response.json();
        const city = json.properties.relativeLocation.properties.city;
        const state = json.properties.relativeLocation.properties.state;
  
        // Make a second API call to get the weather forecast
        const forecastUrl = json.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        const forecastJson = await forecastResponse.json();
  
        // Update state with the weather data
        this.setState({
          weather: forecastJson,
          city: city,
          state: state
        })
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error, update state accordingly if needed
      }
    });

  }

  getWeatherIcon(data) {
    if (data.shortForecast.toLowerCase().includes("partially cloudy")) {
      return (<FontAwesomeIcon icon={faCloudSun}/>);
    } else if (data.shortForecast.toLowerCase().includes("cloudy")){
      return (<FontAwesomeIcon icon={faCloud}/>);
    } else if (data.shortForecast.toLowerCase().includes("sunny")) {
      this.setState({backgroundLabel: "Rocky Mountain National Park"})
      return (<FontAwesomeIcon icon={faSun}/>);
    } else if (data.shortForecast.toLowerCase().includes("light rain")
      || data.shortForecast.toLowerCase().includes("showers")
      || data.shortForecast.toLowerCase().includes("drizzle")) {
      return (<FontAwesomeIcon icon={faCloudRain}/>);
    } else if (data.shortForecast.toLowerCase().includes("rain")) {
      return (<FontAwesomeIcon icon={faCloudShowersHeavy}/>);
    } else if (data.shortForecast.toLowerCase().includes("snow")) {
      return (<FontAwesomeIcon icon={faSnowflake}/>)
    } else if (data.shortForecast.toLowerCase().includes("thunderstorm")) {
      return (<FontAwesomeIcon icon={faCloudBolt}/>)
    } else if (data.shortForecast.toLowerCase().includes("clear")) {
      return (<FontAwesomeIcon icon={faMoon}/>)
    }
  }

  render() {
    if (this.state.weather === '') {
      return(
        <div id='page-content' className='loading'>
          Loading Weather Data...
        </div>
      );
    } else {
      return(
        <div id='page-content'>
          <div id='main-content'>
            <div id='location-info'>{this.state.city}, {this.state.state}</div>
            <div id='date-info'>{weekdays[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}</div>
            <div id='daily-weather'>
              <div id='weather-main' className='weather-info'>
                <div id='weather-icon' className='weather-main-info'>{this.getWeatherIcon(this.state.weather.properties.periods[0])}</div>
                <div id='temperature-shortForecast' className='weather-main-info'>
                  <div id='temperature'>{this.state.weather.properties.periods[0].temperature}°</div>
                  <div id='short-forecast'>{this.state.weather.properties.periods[0].shortForecast}</div>
                </div>
              </div>
              <div id='weather-details' className='weather-info'>
                <div id='wind-speed' className='weather-detail-container'>
                  <div className='weather-detail-info'>{this.state.weather.properties.periods[0].windSpeed}</div>
                  <div className='weather-detail-label'>Wind Speed</div>
                </div>
                <div id='wind-direction' className='weather-detail-container'>
                  <div className='weather-detail-info'>{this.state.weather.properties.periods[0].windDirection}</div>
                  <div className='weather-detail-label'>Wind Direction</div>
                </div>
                <div id='humidity' className='weather-detail-container'>
                  <div className='weather-detail-info'>{this.state.weather.properties.periods[0].relativeHumidity.value}%</div>
                  <div className='weather-detail-label'>Humidity</div>
                </div>
              </div>
            </div>
            <div id='future-weather'>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[1].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[1].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[1])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[3].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[3].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[3])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[5].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[5].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[5])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[7].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[7].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[7])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[9].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[9].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[9])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[11].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[11].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[11])}</div>
              </div>
              <div className='future-forecast-container'>
                <div className='future-forecast-label'>{this.state.weather.properties.periods[13].name}</div>
                <div className='future-forecast-temperature'>{this.state.weather.properties.periods[13].temperature}</div>
                <div className='future-forecast-icon'>{this.getWeatherIcon(this.state.weather.properties.periods[13])}</div>
              </div>
            </div>
          </div>
          <div id='background-label'>{this.state.backgroundLabel}</div>
        </div>
      );
    }
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);