import React, { Component } from "react";
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      error: null,
      showResults: false,
    };
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const { locationLat, locationLon, locationDisplayName } = this.props;

    axios
      .get("/weather", {
        params: {
          lat: locationLat,
          lon: locationLon,
          searchQuery: locationDisplayName,
        },
      })
      .then((response) => {
        this.setState({ forecast: response.data, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.response.data.error });
      });
  }

  handleShowResults = () => {
    this.setState({ showResults: true });
  };

  handleGetWeather = () => {
    const url = `https://localhost:3000/weather`;
    const result = axios.get(url);
    console.log(result.data);
  };

  render() {
    const { forecast, error, showResults } = this.state;

    return (
      <>
        {error && <div className="error">{error}</div>}
        {showResults && forecast.length > 0 && (
          <div className="main">
            <h2>Weather Forecast</h2>
            <ListGroup>
              {forecast.map((item, index) => (
                <ListGroup.Item key={index}>
                  <strong>{item.date}:</strong> {item.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <Button onClick={this.handleShowResults}>Weather Forecast</Button>
      </>
    );
  }
}

export default Weather;
