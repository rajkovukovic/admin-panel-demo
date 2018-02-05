import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeader from '../views/MainHeader';
import MainSidebar from '../views/MainSidebar';
import * as AuthActions from '../../store/actionCreators/authActionCreator';

/* eslint-disable */
class AppHOC extends Component {
  static propTypes = {
    activeRoute:     PropTypes.string,
    userName:        PropTypes.string,
    userPhoto:       PropTypes.string,
    content:         PropTypes.element,
    contentHeadline: PropTypes.string,
    padding:         PropTypes.bool,
    title:           PropTypes.string,
  }

  static defaultProps = {
    activeRoute:     '',
    userName:        '',
    userPhoto:       '',
    mainContent:     undefined,
    contentHeadline: '',
    padding:         false,
    title:           'Admin Panel',
  }

  render () {
    const { activeRoute, userPhoto, content, contentHeadline, padding, title } = this.props;
    return (
      <div className="MainWrapper">
        <MainHeader
          userPhoto={userPhoto}
          title={title}
        />
        <MainSidebar
          activeRoute={activeRoute}
        />
        <div className={`MainContent${padding ? ' MainContent-Padding' : ''}`}>
          { contentHeadline &&
            <h2 className="MainContentHeadline">{contentHeadline}</h2>
          }
          {content}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName:  state.auth.user.username,
    userPhoto: state.auth.user.photoURL,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    checkStorageAuthToken: () => dispatch(AuthActions.checkStorageAuthToken()),
    signIn:                payload => dispatch(AuthActions.signIn(payload)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHOC);
