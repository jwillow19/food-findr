import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  Circle,
} from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';

const RenderMap = withScriptjs(
  withGoogleMap(({ filter, search }) => {
    const { radius, rate } = filter;
    const { coords } = search;
    const curLocation = { lat: coords.latitude, lng: coords.longitude };

    // function appendScript() {
    //   const script = document.createElement('script');
    //   const api_key = process.env.REACT_APP_API_KEY;
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initializeMap`;
    //   script.async = true;
    //   script.defer = true;
    //   script.id = 'google-script';
    //   document.body.appendChild(script);
    // }
    // useEffect(() => {
    //   appendScript();

    //   // callback=initialize from script src is looking for a function in window
    //   // word aroound -> create a window method ("global function")
    //   window.initializeMap = () => {
    //     var latlng = new window.google.maps.LatLng(
    //       coords.latitude,
    //       coords.longitude
    //     );
    //     var myOptions = {
    //       zoom: 5,
    //       center: latlng,
    //       mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    //     };
    //     var map = new window.google.maps.Map(
    //       document.getElementById('map'),
    //       myOptions
    //     );
    //     //   var marker = new window.google.maps.Marker({
    //     //     position: latlng,
    //     //     map,
    //     //     animation: window.google.maps.Animation.BOUNCE,
    //     //   });
    //     //   marker.setMap(map);
    //   };
    // }, []);
    // //   var latlng = new window.google.maps.LatLng(coords.latitude, coords.longitude);

    //   function setMarker(map) {
    //     var marker = new window.google.maps.Marker({
    //       position: { lat: coords.latitude, lng: coords.longitude },
    //       map: map,
    //       animation: window.google.maps.Animation.BOUNCE,
    //     });
    //     marker.setMap(map);
    //   }

    //   function renderCircle() {
    //     var cityCircle = new window.google.maps.Circle({
    //       strokeColor: '#FF0000',
    //       strokeOpacity: 0.8,
    //       strokeWeight: 2,
    //       fillColor: '#FF0000',
    //       fillOpacity: 0.35,
    //       map: map,
    //       center: { lat: coords.latitude, lng: coords.longitude },
    //       radius: 100,
    //     });
    //   }

    //<div id='map' style={{ height: '100%' }}></div>

    // state to store the place to search
    const [place, setPlace] = useState(null);
    const [mapState, setMapState] = useState(null);

    useEffect(() => {
      // // things to run after map has been rendered
      // const createMarker = (place) => {
      //   var marker = new window.google.maps.Marker({
      //     map: mapState,
      //     position: place.geometry.location,
      //   });
      // };
      // // Create a service to map, link to map component with ref
      // const service = new window.google.maps.places.PlacesService(mapState);
      // console.log(service);
      // // create search request
      // var request = {
      //   query: 'Museum of Contemporary Art Australia',
      //   fields: ['name', 'geometry'],
      // };
      // service.findPlaceFromQuery(request, function (results, status) {
      //   if (status == window.google.maps.places.PlacesServiceStatus.OK) {
      //     for (var i = 0; i < results.length; i++) {
      //       createMarker(results[i]);
      //     }
      //     mapState.setCenter(results[0].geometry.location);
      //   }
      // });
    }, []);

    function onMapMount(element) {
      const mapObject = element.context[MAP];
      setMapState(mapObject);
      console.log(mapState);
    }
    return (
      // Generates map with marker and circle
      <GoogleMap
        defaultZoom={12}
        defaultCenter={curLocation}
        // saving map to state
        // ref={map}
        // const service = new window.google.maps.places.PlacesService(map);
        // console.log(service);
      >
        <Marker position={curLocation} />
        <Circle center={curLocation} radius={radius * 1000} />
      </GoogleMap>
    );
  })
);

RenderMap.propTypes = {
  filter: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  search: state.search,
});
export default connect(mapStateToProps)(RenderMap);
