import React, { Component } from 'react';
import BikeMap from './bike-map';
import FavoriteStations from './favorite-stations';
import Select from 'react-select';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: props.cities,
      stations: props.stations,
      center: {
        lat: props.lat,
        lng: props.lng
      }
    }
    this.updateStations = this.updateStations.bind(this)
  }

  updateStations(object) {
    this.getStations(object.label).then(response => {
      this.setState({
        city: object.value,
        stations: response,
        center: {
          lat: parseFloat(response[0].latitude),
          lng: parseFloat(response[0].longitude)
        }
      })
    })
  }

  getStations(value) {
    var url = "stations/" + value;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(j) {
      return j;
    });
  }

  render () {
    var Select = require('react-select');
    var options = this.props.cities.map(city => Object.assign({}, { value: city.href, label: city.name, clearableValue: false}));
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='tromba'>
              <Select
              name="form-field-name"
              value={this.state.city}
              options={options}
              onChange={this.updateStations}
              />
              <BikeMap stations={this.state.stations} center={this.state.center} />
            </div>
          </div>
          <FavoriteStations stations={this.state.stations} fav_stations={this.props.favorite_stations} current_user={this.props.current_user}/>
        </div>
      </div>
    )
  }
}

export default Map
