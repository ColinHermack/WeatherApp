import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const API_KEY = '29a87d25c17942e883a1c75f0efa1417'  //I know how to hide an API key I just don't care because this one is free
let url = "";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    }
  }

  componentDidMount() {
    //Get GPS coordinates
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })

    //Construct the URL for the API call
    url = 'https://api.openweathermap.org/data/2.5/onecall?lat={'
      + String(this.state.latitude) + '}&long={' +String(this.state.longitude) + '}&appid={' +String(API_KEY) + '}';

    //Get weather data
    fetch(url)
      .then(response => {console.log(response)})

  }

  render() {
    return(
      <div>
        <div id="page-content">

        </div>
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);
