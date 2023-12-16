import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: process.env.API_KEY
    }
  }

  componentDidMount() {

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
