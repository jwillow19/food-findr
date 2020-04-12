import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadLocation } from '../../actions/search';

var scriptAppend = false;
// Add GoogleScipt in body tag - run after render
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

const RenderMap = ({ filter, search, loadLocation }) => {
  // const { radius, rate } = filter;

  const { coords } = search;
  const curLocation = { lat: coords.latitude, lng: coords.longitude };
  const [placeState, setPlace] = useState(null);

  const mapRef = useRef(); // make reference to div component for map object

  var map;

  const createSelfMarker = (map) => {
    var marker = new window.google.maps.Marker({
      position: curLocation,
      map,
      animation: window.google.maps.Animation.BOUNCE,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    });
    marker.setMap(map);
  };

  // Marker with InfoWindow to display search results
  const createMarker = (result) => {
    var marker = new window.google.maps.Marker({
      map,
      position: result.geometry.location,
      title: result.name,
    });
    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      `<h1 id="firstHeading" class="firstHeading">${result.name}</h1>` +
      '<div id="bodyContent">' +
      `<p>Location: ${result.vicinity}</p>` +
      `<p>Rating: ${result.rating}</p>` +
      `<p>Price Level: ${result.price_level}</p>` +
      `<p>Total Rating: ${result.user_ratings_total}</p>` +
      `<img src=${result.icon} height="42" width="42">` +
      '</div>' +
      '</div>';

    var infowindow = new window.google.maps.InfoWindow({
      // content: `Name: ${result.name}\nLocation: ${result.vicinity}`,
      content: contentString,
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
      // unable to open one infowindow individually, resort to setTimeout instead
      setTimeout(() => {
        infowindow.close();
      }, 3500);
    });
  };

  // Callback for google script
  const initMap = async () => {
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

    createSelfMarker(map);

    // add circle
    var circle = new window.google.maps.Circle({
      strokeColor: '#424242',
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: '#424242',
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

    await service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
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
    appendScript();
    window.initMap = initMap;
  };

  // **create a filterObj (radius, rating, type), reredner on filterObj change

  useEffect(() => {
    renderGMap();
    // initMap
  }, [filter.radius]);

  return (
    // where the map is stored
    <div id='map' ref={mapRef} style={{ height: '100%' }}></div>
  );
};

RenderMap.propTypes = {
  filter: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  loadLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  search: state.search,
});
export default connect(mapStateToProps, { loadLocation })(RenderMap);
