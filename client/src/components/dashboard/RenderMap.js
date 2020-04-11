import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

var scriptAppend = false;

function appendScript() {
  const script = document.createElement('script');
  const api_key = process.env.REACT_APP_API_KEY;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places,geometry,drawing&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.id = 'google-script';
  document.body.appendChild(script);
  scriptAppend = true;
}

const RenderMap = ({ filter, search }) => {
  // const { radius, rate } = filter;
  const { coords } = search;
  const curLocation = { lat: coords.latitude, lng: coords.longitude };

  // make reference to div component for map object
  const mapRef = createRef();

  var map;

  // Add GoogleScipt in body tag - run after render
  // const appendScript = () => {
  //   const script = document.createElement('script');
  //   const api_key = process.env.REACT_APP_API_KEY;
  //   // script.src = 'https://maps-api-ssl.google.com/maps/api/js?sensor=true';
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places&callback=initMap`;
  //   script.async = true;
  //   script.defer = true;
  //   script.id = 'google-script';
  //   document.body.appendChild(script);
  //   scriptAppend = true;
  // };
  // a create marker for current location function
  const createSelfMarker = (map) => {
    var marker = new window.google.maps.Marker({
      position: curLocation,
      map,
      animation: window.google.maps.Animation.BOUNCE,
    });
    marker.setMap(map);
  };
  // marker function to mark nearby places results
  const createMarker = (result) => {
    var marker = new window.google.maps.Marker({
      map,
      position: result.geometry.location,
    });
  };
  // Callback for google script
  const initMap = () => {
    var myOptions = {
      zoom: 12,
      center: curLocation,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };
    map = new window.google.maps.Map(
      // get reference to div,
      mapRef.current,
      myOptions
    );
    // create a marker to the map
    // var marker = new window.google.maps.Marker({
    //   position: curLocation,
    //   map,
    //   animation: window.google.maps.Animation.BOUNCE,
    // });
    // marker.setMap(map);

    createSelfMarker(map);

    // add circle
    var circle = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map,
      center: curLocation,
      radius: filter.radius * 1000,
    });

    // search nearby places
    var request = {
      // query: 'Museum of Contemporary Art Australia',
      location: curLocation,
      radius: filter.radius * 1000,
      // locationBias: { radius: radius * 1000, center: curLocation },
      fields: ['name', 'geometry'],
      type: ['restaurant'],
    };

    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    });
  };
  // appends script + set window method initMap
  const renderGMap = () => {
    // if (!scriptAppend) {
    //   appendScript();
    // }
    // appendScript();
    window.initMap = initMap;
  };

  // **create a filterObj (radius, rating, type), reredner on filterObj change

  useEffect(() => {
    renderGMap();
    initMap();
  }, [filter.radius]);

  return (
    // Generates map with marker and circle
    <div id='map' ref={mapRef} style={{ height: '100%' }}></div>
  );
};

RenderMap.propTypes = {
  filter: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  search: state.search,
});
export default connect(mapStateToProps)(RenderMap);
