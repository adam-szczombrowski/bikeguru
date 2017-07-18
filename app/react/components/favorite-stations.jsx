import React, { Component } from 'react';
import FavoriteStation from './favorite-station';
import Select from 'react-select';
import "isomorphic-fetch"


class FavoriteStations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: this.props.stations,
      fav_stations: this.props.fav_stations
    }
    this.updateCurrentStation = this.updateCurrentStation.bind(this)
    this.addToFavorite = this.addToFavorite.bind(this)
    this.deleteStation = this.deleteStation.bind(this)
  }

  addToFavorite() {
    var self = this;
    var station_id = this.state.current_station_id;
    if(typeof station_id != "undefined" )
    {
      var token = $('meta[name="csrf-token"]').attr('content');
      var url = 'favorite/' + station_id;
      var station = fetch(url, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({}),
        credentials: 'same-origin'
      }).then(function(response) {
        return response.json();
      }).then(function(j) {
        if (j != null)
        {
          self.setState({
            fav_stations: self.state.fav_stations.concat([j]),
          })
        }
        return j;
      });
    }
  }

  updateCurrentStation (object) {
    this.setState({
      current_station_id: object.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stations: nextProps.stations
    })
  }

  deleteStation(station) {
    var self = this;
    var token = $('meta[name="csrf-token"]').attr('content');
    var url = 'remove/' + station.id;
    var station = fetch(url, {
      method: 'delete',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({}),
      credentials: 'same-origin'
    }).then(function(response) {
      return response.json();
    }).then(function(j) {
      var index = self.state.fav_stations.map( station => station.id ).indexOf(j.id);
      self.setState({
        fav_stations: self.state.fav_stations.filter((_, i) => i !== index)
      })
      return j;
    });

  }

  render () {
    var Select = require('react-select');
    var options = this.state.stations.map(station => Object.assign({}, { value: station.id, label: station.name, clearableValue: false}));
    if (this.props.current_user)
    {
      var returnValue =
      <div>
        <div className='favorite-stations-header'>Favorite Stations:</div>
        {this.state.fav_stations.map(station => <div className='fav-station'><div className='delete-button' onClick={ () => this.deleteStation(station)}>| Delete</div><FavoriteStation station={station} /></div>)}
        <Select
          name="form-field-name"
          value={this.state.current_station_id}
          options={options}
          onChange={this.updateCurrentStation}
        />
        <div className='favorite-button text-center' onClick={this.addToFavorite}>
          Add to favorite
        </div>
      </div>;
    }else{
      <div></div>
    }
    return (
      <div className='col-md-6 favorite-stations text-left'>
        {returnValue}
      </div>
    )
  }
}

export default FavoriteStations
