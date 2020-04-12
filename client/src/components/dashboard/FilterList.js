import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AdjustIcon from '@material-ui/icons/Adjust';
import StarIcon from '@material-ui/icons/Star';

import { filterRadius, filterRate } from '../../actions/filter';

const FilterList = ({ filterRadius, filterRate }) => {
  const [radius, setRadius] = useState({
    radiusIsSelect: null,
  });
  const [rating, setRating] = useState({
    ratingIsSelect: null,
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

  // // an object with all filtered values to be pass onto action
  // let refineSearch = {
  //   radius: null,
  //   rating: null,
  // };
  const radiusList = [5, 10, 20];
  const ratingList = [1, 2, 3, 4, 5];
  // <MenuItem onClick={handleRadiusClose}>5 km</MenuItem>
  //         <MenuItem onClick={handleRadiusClose}>10 km</MenuItem>
  // //         <MenuItem onClick={handleRadiusClose}>20 km</MenuItem>
  // <MenuItem onClick={handleRatingClose}>1 star</MenuItem>
  //       <MenuItem onClick={handleRatingClose}>2 stars</MenuItem>
  //       <MenuItem onClick={handleRatingClose}>3 stars</MenuItem>
  //       <MenuItem onClick={handleRatingClose}>4 stars</MenuItem>
  //       <MenuItem onClick={handleRatingClose}>5 stars</MenuItem>

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
    </Fragment>
  );
};

// FilterList.propTypes = {
//   // filter: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//     filter: state.filter
// })
export default connect(null, { filterRadius, filterRate })(FilterList);
