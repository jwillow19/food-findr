/* global google */
import React from 'react';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
    this.mapMounted = this.mapMounted.bind(this);
  }

  fetchPlaces(map) {
    const request = {
      location: map.getCenter(),
      radius: '500',
      type: ['restaurant'],
    };
    let service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const places = results.map((item, i) => {
          return {
            position: item.geometry.location,
            id: i,
          };
        });
        this.setState({ places });
      }
    });
  }

  mapMounted(element) {
    const mapObject = element.context[MAP];
    this.fetchPlaces(mapObject);
  }

  render() {
    return (
      <GoogleMap
        ref={this.mapMounted}
        defaultZoom={this.props.zoom}
        defaultCenter={{
          lat: this.props.center.lat,
          lng: this.props.center.lng,
        }}
      >
        {this.state.places.map((place) => {
          return <Marker key={place.id} position={place.position} />;
        })}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
