const data = require("../dataAPI.json");
let favoriteStates = [];
let id = 0;

module.exports = {
  readData: (req, res) => {
    res.status(200).send(data);
  },

  stateData: (req, res) => {
    res.status(200).send(data);
  },

  postUserStateChoice: (req, res) => {
    const { state_flag_url, name } = req.body;
    console.log("req", req.body);
    const newFavorite = {
      state_flag_url: state_flag_url,
      id: id,
      name: name
    };
    favoriteStates.push(newFavorite);
    id++;
    console.log(favoriteStates);
    res.status(200).send(favoriteStates);
  },

  updateFavorite: (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { state_flag_url, name } = req.body;
    favoriteStates.forEach(usState => {
      if (usState.id === +id) {
        usState.state_flag_url = state_flag_url;
        usState.name = name;
      }
    });
    console.log(favoriteStates);
    res.status(200).send(favoriteStates);
  },

  deleteFavorite: (req, res) => {
    const { id } = req.params;
    favoriteStates = favoriteStates.filter(usState => {
      return usState.id !== +id;
    });
    res.status(200).send(favoriteStates);
  },

  searchState: (req, res) => {
    console.log(req.query);
    const { name } = req.query;
    let searchedState = name.toLowerCase();
    let filteredList = data.filter(usState => {
      console.log("name", usState.name);
      if (usState.name.toLowerCase() === searchedState) {
        return usState.name;
      }
    });
    console.log("filtered", filteredList);

    if (filteredList.length > 0) {
      res.status(200).send(filteredList);
    } else {
      res.status(200).send("Invalid State Name");
    }
  }
};
