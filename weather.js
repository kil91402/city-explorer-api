import React, { Component } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      error: null,
    };
  }

  componentDidMount() {
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

  render() {
    const { forecast, error } = this.state;

    return (
      <>
        {error && <div className="error">{error}</div>}
        {forecast.length > 0 && (
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
      </>
    );
  }
}

export default Weather;
