import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

class BikeMap extends Component {

  constructor (props) {
    super()
    this.state = {
      center: props.center,
      markers: props.stations.map(station => Object.assign({}, this.createMarker(station))),
      current_station: null
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  createMarker(station) {
    return {
      position: new google.maps.LatLng(station.latitude, station.longitude),
      showInfo: false,
      infoContent: "Station: " + station.name + "\nBikes: " + station.free_bikes,
      station: station
    };
  }
  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(targetMarker) {
    this.setState({
      current_station: targetMarker.station,
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      current_station: targetMarker.station,
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      markers: nextProps.stations.map(station => Object.assign({}, this.createMarker(station))),
      center: nextProps.center
    })
  }

  favoriteStation() {
    var station = this.state.current_station;
    if (station != null)
    {
      var url = 'favorite/' + station.id;
      return fetch(url, method: 'POST').then(function(response) {
        return response.json();
      })
    }
  }

  render() {
    return (
      <div>
        <div className='tromba'>
          <PopUpInfoWindowExampleGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            center={this.state.center}
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick}
            onMarkerClose={this.handleMarkerClose}
          />
        </div>
      </div>
    );
  }
}

export default BikeMap
