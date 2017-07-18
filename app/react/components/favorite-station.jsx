import React, { Component } from 'react';

class FavoriteStation extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="favorite-station">
        <div>Station name: {this.props.station.name}</div>
        <div>Free bikes: {this.props.station.free_bikes}</div>
      </div>
    )
  }
}

export default FavoriteStation
