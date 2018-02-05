/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import AppRoutes from '../../constants/routes';
import CircularProgress from './CircularProgress';
import { ServerStatesColor } from '../../constants/style';

const NODE_SIZE = 60;

const greatPlaceStyle = {
  position: 'absolute',
  fontSize: `${NODE_SIZE / 5}px`,
  width:    NODE_SIZE,
  height:   NODE_SIZE,
  left:     -NODE_SIZE / 2,
  top:      -NODE_SIZE / 2,
};

export default class MyGreatPlace extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    node:     PropTypes.any.isRequired,
  };

  static defaultProps = {
    isActive: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isActive, node } = this.props;
    const { name, uptime, serverId, state: serverState } = node || {};
    return (
      <div className={'ServerMapMarker' + (isActive ? ' ServerMapMarker--active' : '')}>
        <CircularProgress
          style={greatPlaceStyle}
          className={'ServerListNodePieChart ServerListNodePieChart--map' + (isActive ? ' ServerListNodePieChart--map--active' : '')}
          value={uptime * 100}
          size={NODE_SIZE}
          lineWidth={3}
          color={ServerStatesColor[serverState]}
        />
        <div className="ServerListNodeInfo">
          <span style={{color: ServerStatesColor[serverState]}}>
            {name}
          </span>
          <span style={{color: ServerStatesColor[serverState]}}>
            {serverState}
          </span>
          <span>
            {`${node.location.city}, ${node.location.country}`}
          </span>
        </div>
      </div>
    );
  }
}