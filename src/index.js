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
      weather: ""
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

  getWeatherIcon() {
    if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("partially cloudy")) {
      return (<FontAwesomeIcon icon={faCloudSun}/>);
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("cloudy")){
      return (<FontAwesomeIcon icon={faCloud}/>);
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("sunny")) {
      return (<FontAwesomeIcon icon={faSun}/>);
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("light rain")
      || this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("showers")) {
      return (<FontAwesomeIcon icon={faCloudRain}/>);
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("rain")) {
      return (<FontAwesomeIcon icon={faCloudShowersHeavy}/>);
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("snow")) {
      return (<FontAwesomeIcon icon={faSnowflake}/>)
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("thunderstorm")) {
      return (<FontAwesomeIcon icon={faCloudBolt}/>)
    } else if (this.state.weather.properties.periods[0].shortForecast.toLowerCase().includes("clear")) {
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
      console.log(this.state.weather);
      return(
        <div id='page-content'>
          <div id='main-content'>
            <div id='location-info'>{this.state.city}, {this.state.state}</div>
            <div id='date-info'>{weekdays[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}</div>
            <div id='daily-weather'>
              <div id='weather-main' className='weather-info'>
                <div id='weather-icon'>{this.getWeatherIcon()}</div>
                <div id='temperature'>{this.state.weather.properties.periods[0].temperature}°</div>
              </div>
              <div id='weather-details' className='weather-info'></div>
            </div>
          </div>
        </div>
      )
    }
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);
