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
    //Get GPS coordinates
    let latitude = 0;
    let longitude = 0;
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      //Construct URL for first API call
      let url = "https://api.weather.gov/points/" + String(latitude) + "," + String(longitude);

      //Make initial API call to get local weather office and grid position
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.send();
      req.onload = function() {
        const json = JSON.parse(req.responseText);
        //Make a second API call to get the weather forecast
        const req2 = new XMLHttpRequest();
        req2.open("GET", json.properties.forecast, true);
        req2.send();
        req2.onload = function() {
          const json2 = JSON.parse(req2.responseText);
          console.log(json2);
        }
      }

      
    })

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
