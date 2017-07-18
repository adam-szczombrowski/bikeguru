import React from 'react';
import { geolocated } from 'react-geolocated';
import Map from './map';

class Demo extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <Map cities={this.props.cities} lat={52.4064} lng={16.9252} stations={this.props.stations} favorite_stations={this.props.favorite_stations} current_user={this.props.current_user} />
        : this.props.coords
          ? <Map cities={this.props.cities} lat={this.props.coords.latitude} stations={this.props.stations} lng={this.props.coords.longitude} favorite_stations={this.props.favorite_stations} current_user={this.props.current_user} />
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 1000
})(Demo);
