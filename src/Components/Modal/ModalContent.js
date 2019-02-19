import React, { Component } from "react";
import axios from "axios";
export default class ModalContent extends Component {

  state = {
    weather: null
  }

  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.props.capital_city}&appid=8af428594379a5dafa331cda2fd2eeb4&units=imperial`
      )
      .then(response => {
        console.log(response.data.main.temp)
        this.setState({
          weather: response.data.main.temp
        })
      });
  }

  render() {
    const {
      name,
      nickname,
      skyline_background_url,
      capital_city,
      population,
      code,
      map_image_url,
      landscape_background_url
    } = this.props;

    return (
      <div className="modal">
        <div className="modal-content">
          <h1>
            {name} ({code})
          </h1>
          <img src={map_image_url} />
          <h4>Nickname: {nickname}</h4>
          <h4>City Capital: {capital_city}</h4>
          <h4>Population: {population.toLocaleString()}</h4>
          <br />

          <h4>Current Weather in {capital_city}, {code}: {this.state.weather}°F</h4>
          <img src={skyline_background_url} />
          <img src={landscape_background_url} />
          <br />
          <button className="modal-close" onClick={this.props.hideModal}>
            X
          </button>
        </div>
      </div>
    );
  }
}
