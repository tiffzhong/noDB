const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  PORT = 4000,
  myController = require("./controllers/controller");
app.use(bodyParser.json());

app.get("/api/us-states", myController.readData);
// getting flags to read

app.post("/api/us-states", myController.postUserStateChoice);
//picking flags as favorites

app.put("/api/us-states/:id", myController.updateFavorite);

app.delete("/api/us-states/:id", myController.deleteFavorite);

app.get("/api/us-states/search", myController.searchState);


app.get("/api/us-states", myController.stateData); //For external API


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
