import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: ""
    }
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
  
        // Make a second API call to get the weather forecast
        const forecastUrl = json.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        const forecastJson = await forecastResponse.json();
  
        // Update state with the weather data
        this.setState({weather: forecastJson})
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error, update state accordingly if needed
      }
    });

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
