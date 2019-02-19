import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Favorites from "./Components/Favorites/Favorites";
import Modal from "./Components/Modal/Modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStateName: "",
      selectedStateFlag: null,
      usStates: [],
      searchTerm: "",
      toggle: false,
      display: false,
      selectedID: []
    };
    this.searchState = this.searchState.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    axios.get("/api/us-states").then(response => {
      console.log(response.data);
      this.setState({
        usStates: response.data
      });
    });
  }

  hideModal() {
    this.setState({ display: false });
  }

  setFlags(usState) {
    console.log("usState", usState);

    // axios.get("/api/us-states").then(response => {
    this.setState({
      selectedStateName: usState.name,
      selectedStateFlag: usState.state_flag_url,
      display: true,
      selectedID: usState
    });
  }

  searchState(value) {
    axios.get(`/api/us-states/search?name=${value}`).then(response => {
      if (response.data === "Invalid State Name") {
        alert(response.data);
      } else {
        console.log(response.data);
        this.setState({
          selectedStateFlag: response.data[0].state_flag_url,
          searchTerm: ""
        });
      }
    });
  }

  render() {
    const {
      usStates,
      selectedStateName,
      selectedStateFlag,
      display
    } = this.state;
    console.log(this.state, "this.state");
    const states = usStates.length ? (
      usStates.map(usState => {
        return (
          <img
            key={usState.name}
            onClick={() => {
              this.setFlags(usState);
            }}
            src={usState.state_flag_url}
          />
        );
      })
    ) : (
      <img src="http://bestanimations.com/Flags/USA/usa-american-flag-waving-animated-gif-26.gif" />
    );
    console.log("display", this.state.display);
    return (
      <div className="App">
        <header>
          <section className="header-container">
            <h1>The United States</h1>
            <h6>_______________</h6>
            <h3>Which US State Have You Visited?</h3>
            <h4>Search For a State or Click Around and add it to your list!</h4>
          </section>
          <section className="search-container">
            <input
              placeholder="Type a state name here"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
            />
            <button onClick={() => this.searchState(this.state.searchTerm)}>
              Search
            </button>
          </section>

          <Modal
            hideModal={this.hideModal}
            display={display}
            selectedID={this.state.selectedID}
          />
          <Favorites
            setFlags={this.setFlags}
            selectedStateName={selectedStateName}
            selectedStateFlag={selectedStateFlag}
            updateFavorite={this.updateFavorite}
            deleteFavorite={this.deleteFavorite}
          />
        </header>
        <section>
          <div className="all-flags-container">{states}</div>
        </section>
      </div>
    );
  }
}
export default App;
