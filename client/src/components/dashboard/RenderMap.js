import React, { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRemoteLocation } from '../../actions/search';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Add GoogleScipt in body tag - run after render
function appendScript() {
  const script = document.createElement('script');
  const api_key = process.env.REACT_APP_API_KEY;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places,geometry,drawing&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.id = 'google-script';
  document.body.appendChild(script);
}

const RenderMap = ({ filter, search, setRemoteLocation }) => {
  const { coords } = search;
  var curLocation = { lat: coords.lat, lng: coords.lng };

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

    // autocomplete feature
    var input = document.getElementById('searchInput');
    var autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // place.geometry
      var locationObj = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setRemoteLocation(locationObj);
    });
    // PROBLEM: PLACE.GEOMETRY.LOCATION returns FUNCTION NOT NUMBER!!!!!!!!!
    // var curLocation = { lat: coords.lat, lng: coords.lng };
    // console.log(typeof coords.lat);

    createSelfMarker(map);

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

    var infowindow = new window.google.maps.InfoWindow();

    var request = {
      location: curLocation,
      radius: filter.radius * 1000,
      fields: ['name', 'geometry'],
      type: ['restaurant'],
    };

    var service = new window.google.maps.places.PlacesService(map);

    // show-more button
    var getNextPage = null;
    var moreButton = document.getElementById('more');
    moreButton.onclick = function () {
      moreButton.disabled = true;
      if (getNextPage) getNextPage();
    };

    // function factory - create different infowindow for different marker
    //    storing different pMarker, pContent to create different infowindow when clicked
    function makeInfoWindowListener(pMarker, pContent) {
      return function () {
        infowindow.setContent(pContent);
        infowindow.open(map, pMarker);
      };
    }

    // Clear content in placeList everytime page rerender so list doesn't stack
    document.getElementById('places').innerHTML = '';

    service.nearbySearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          // skip ratings that are less than filter
          if (results[i].rating < filter.rate) {
            continue;
          }
          // i < results.length
          // createMarker(results[i]);
          var image = {
            url: results[i].icon,
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
          };

          var marker = new window.google.maps.Marker({
            map,
            icon: image,
            position: results[i].geometry.location,
            title: results[i].name,
          });

          var placesList = document.getElementById('places');
          var li = document.createElement('li');
          li.textContent = results[i].name;
          placesList.appendChild(li);

          var contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            `<h1 id="firstHeading" class="firstHeading">${results[i].name}</h1>` +
            '<div id="bodyContent">' +
            `<p>Location: ${results[i].vicinity}</p>` +
            `<p>Rating: ${results[i].rating}</p>` +
            `<p>Price Level: ${results[i].price_level}</p>` +
            `<p>Total Rating: ${results[i].user_ratings_total}</p>` +
            `<img src=${results[i].icon} height="42" width="42">` +
            '</div>' +
            '</div>';
          // [Note*] markers have different click callback functions simply by making a function factory - old method is simply setting the infowindow to the last results variable.
          marker.addListener(
            'click',
            makeInfoWindowListener(marker, contentString)
          );
          moreButton.disabled = !pagination.hasNextPage;
          getNextPage =
            pagination.hasNextPage &&
            function () {
              pagination.nextPage();
            };
        }
      }
    });
  };
  // appends script + set window method initMap
  const renderGMap = () => {
    appendScript();
    window.initMap = initMap;
  };

  useEffect(() => {
    renderGMap();
  }, [filter.radius, filter.rate, filter.type, search.coords]);

  return (
    // where the map is stored
    <Fragment>
      <div id='map' ref={mapRef} style={{ height: '100%' }}></div>
      <div id='right-panel'>
        <Typography component='h1' variant='h6' color='inherit' noWrap>
          Results
        </Typography>
        <ul id='places'></ul>
        <Button variant='contained' color='primary' id='more'>
          More results
        </Button>
      </div>
    </Fragment>
  );
};

RenderMap.propTypes = {
  filter: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  setRemoteLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filter: state.filter,
  search: state.search,
});
export default connect(mapStateToProps, { setRemoteLocation })(RenderMap);
