import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */

class MainHeader extends Component {
  static propTypes = {
    userPhoto: PropTypes.string,
    title:     PropTypes.string,
  }

  static defaultProps = {
    userPhoto: '',
    title:     '',
  }

  render () {
    const { userPhoto, title } = this.props;
    return (
      <div className="MainHeader">
        <span
          className="MainHeaderPhoto"
          onClick={ () => { localStorage.clear(); window.location.reload(); }}
        >
          <span className="MainHeaderPhotoContainer">
            <img className="MainHeaderPhotoImg" src={userPhoto || 'http://navylive.dodlive.mil/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'} alt="user"/>
          </span>
        </span>
        <h1 className="MainHeaderHeading">{title}</h1>
      </div>
  )}
}

export default MainHeader;
