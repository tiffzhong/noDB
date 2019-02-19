import React, { Component } from "react";
import ModalContent from "./ModalContent";
import axios from "axios";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateInfo: [],
      city: undefined
    };
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    axios.get("/api/us-states").then(response => {
      console.log(response.data);
      this.setState({
        stateInfo: response.data
      });
    });
    console.log(this.props.selectedID.length);
  }

  showModal() {
    this.setState({ display: true });
  }

  render() {
    const { display, selectedID } = this.props;
    console.log("selectedID", selectedID.capital_city);
    const stateFacts = (
      <ModalContent
        name={selectedID.name}
        nickname={selectedID.nickname}
        skyline_background_url={selectedID.skyline_background_url}
        capital_city={selectedID.capital_city}
        code={selectedID.code}
        population={selectedID.population}
        map_image_url={selectedID.map_image_url}
        landscape_background_url={selectedID.landscape_background_url}
        showModal={this.showModal}
        hideModal={this.props.hideModal}
      />
    );
    // console.log("statefacts", stateFacts);
    return <div>{display ? stateFacts : null}</div>;
  }
}
export default Modal;
