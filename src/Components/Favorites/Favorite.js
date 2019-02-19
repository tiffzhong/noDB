import React from "react";


function Favorite(props) {
  console.log(props);
  return (
    <div className="favoriteUSState">
      <img src={props.usState.state_flag_url} />
      <button
        className="update"
        onClick={() => props.updateFavorite(props.usState.id)}
      >
        Change
      </button>
      <button
        className="delete"
        onClick={() => props.deleteFavorite(props.usState.id)}
      >
        Delete
      </button>
    </div>
  );
}
export default Favorite;
