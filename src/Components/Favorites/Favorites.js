import React, { Component } from "react";
import axios from "axios";
import Favorite from "./Favorite";

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favoritesList: []
    };
    this.postUserStateChoice = this.postUserStateChoice.bind(this);
    this.updateFavorite = this.updateFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  postUserStateChoice() {
    const pickedState = {
      state_flag_url: this.props.selectedStateFlag,
      name: this.props.selectedStateName
    };
    axios.post("/api/us-states", pickedState).then(response => {
      console.log("post", response.data);
      this.setState({
        favoritesList: response.data
      });
    });
  }

  updateFavorite(id) {
    console.log("this", this);
    console.log(id);
    const updateFavorite = {
      state_flag_url: this.props.selectedStateFlag,
      name: this.props.selectedStateName
    };
    axios.put(`/api/us-states/${id}`, updateFavorite).then(response => {
      this.setState({
        favoritesList: response.data
      });
    });
  }

  deleteFavorite(id) {
    console.log("id", id);
    axios.delete(`/api/us-states/${id}`).then(response => {
      this.setState({
        favoritesList: response.data
      });
    });
  }

  render() {
    const { favoritesList } = this.state; 
    const { selectedStateFlag } = this.props;
    const myFavoriteStates = favoritesList.map(usState => {
      console.log(usState);
      return (
        <Favorite
          key={usState.id}
          updateFavorite={this.updateFavorite}
          usState={usState}
          deleteFavorite={this.deleteFavorite}
        />
      );
    });

    return (
      <div className="favorite-flag-container">
        {myFavoriteStates}
        <div className="selected-flag-container">
          <img src={selectedStateFlag} />
          <button
            className="add"
            onClick={() => {
              this.postUserStateChoice();
            }}
          >
            {" "}
            I've been here!{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default Favorites;
