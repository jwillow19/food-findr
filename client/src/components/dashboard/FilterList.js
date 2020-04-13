import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AdjustIcon from '@material-ui/icons/Adjust';
import StarIcon from '@material-ui/icons/Star';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

import { filterRadius, filterRate, filterType } from '../../actions/filter';

const FilterList = ({ filterRadius, filterRate, filterType }) => {
  const [radius, setRadius] = useState({
    radiusIsSelect: null,
  });
  const [rating, setRating] = useState({
    ratingIsSelect: null,
  });
  const [type, setType] = useState({
    typeIsSelect: null,
  });

  // set state to true onClick. reset state to null & save selected menuitem to object onClose
  const handleRadiusClick = (e) => {
    setRadius({
      radiusIsSelect: e.currentTarget,
    });
  };

  const handleRadiusClose = (item) => {
    setRadius({
      radiusIsSelect: null,
    });
    // refineSearch.radius = item;
    // console.log(refineSearch);
    // store.dispatch(filterRadius(item));
    filterRadius(item);
  };

  const handleRatingClick = (e) => {
    setRating({
      ratingIsSelect: e.currentTarget,
    });
  };

  const handleRatingClose = (item) => {
    setRating({
      ratingIsSelect: null,
    });
    filterRate(item);
    // console.log(refineSearch);
  };

  const handleTypeClick = (e) => {
    setType({
      typeIsSelect: e.currentTarget,
    });
  };

  const handleTypeClose = (item) => {
    setType({
      typeIsSelect: null,
    });
    filterType(item);
  };

  // // an object with all filtered values to be pass onto action
  // let refineSearch = {
  //   radius: null,
  //   rating: null,
  // };
  const radiusList = [5, 10, 20];
  const ratingList = [1, 2, 3, 4, 5];
  const typesList = [
    'bar',
    'cafe',
    'meal_delivery',
    'meal_takeaway',
    'night_club',
    'restaurant',
  ];

  return (
    <Fragment>
      <div>
        <ListItem
          button
          aria-owns='radius-menu'
          aria-controls='radius-menu'
          aria-haspopup='true'
          onClick={handleRadiusClick}
        >
          <ListItemIcon>
            <AdjustIcon />
          </ListItemIcon>
          <ListItemText primary='Search Radius' />
        </ListItem>
        <Menu
          id='radius-menu'
          anchorEl={radius.radiusIsSelect}
          keepMounted
          open={Boolean(radius.radiusIsSelect)}
          onClose={handleRadiusClose}
        >
          {radiusList.map((radii) => (
            <MenuItem key={radii} onClick={() => handleRadiusClose(radii)}>
              {radii}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div>
        <ListItem
          button
          aria-owns='ratings-menu'
          aria-controls='ratings-menu'
          aria-haspopup='true'
          onClick={handleRatingClick}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary='Rating' />
        </ListItem>
        <Menu
          id='ratings-menu'
          anchorEl={rating.ratingIsSelect}
          keepMounted
          open={Boolean(rating.ratingIsSelect)}
          onClose={handleRatingClose}
        >
          {ratingList.map((rate) => (
            <MenuItem key={rate} onClick={() => handleRatingClose(rate)}>
              {rate}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <div>
        <ListItem
          button
          aria-owns='types-menu'
          aria-controls='types-menu'
          aria-haspopup='true'
          onClick={handleTypeClick}
        >
          <ListItemIcon>
            <LocationSearchingIcon />
          </ListItemIcon>
          <ListItemText primary='Type' />
        </ListItem>
        <Menu
          id='types-menu'
          anchorEl={type.typeIsSelect}
          keepMounted
          open={Boolean(type.typeIsSelect)}
          onClose={handleTypeClose}
        >
          {typesList.map((type) => (
            <MenuItem key={type} onClick={() => handleTypeClose(type)}>
              {type}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Fragment>
  );
};

// FilterList.propTypes = {
//   // filter: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//     filter: state.filter
// })
export default connect(null, { filterRadius, filterRate, filterType })(
  FilterList
);
