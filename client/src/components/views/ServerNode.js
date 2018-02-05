import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgress from '../ui/CircularProgress';
import ServerStates from '../../constants/serverState';
import { ServerStatesColor } from '../../constants/style';
import AppRoutes from '../../constants/routes';

/* eslint-disable */



class ServerNode extends Component {
  static propTypes = {
    serverId: PropTypes.string.isRequired,
    name:     PropTypes.string,
    uptime:   PropTypes.number,
    state:    PropTypes.oneOf(Array.from(Object.values(ServerStates))),
  }

  static defaultProps = {
    name:   PropTypes.string,
    uptime: 1,
    state:  ServerStates.UNAVAILABLE,
  }

  render () {
    const { serverId, name, uptime, state: serverState } = this.props;
    const uptime100 = 100 * uptime;
    const uptimeFraction1 = Math.floor((uptime100 % 1) * 100);
    return (
      <Link
        className="ServerListNode"
        to={AppRoutes.SERVER_ID + serverId}
      >
        <CircularProgress
          className="ServerListNodePieChart"
          value={uptime * 100}
          size={80}
          color={ServerStatesColor[serverState]}
        />
        <span className="ServerListNodeInfo">
          <span className="ServerListNodeInfoName">
            <span className="ServerListNodeInfo_Title">
              {'name: '}
            </span>
            <span style={{color: ServerStatesColor[serverState]}}>
              {name}
            </span>
          </span>
          <span className="ServerListNodeInfoState">
            <span className="ServerListNodeInfo_Title">
              {'state: '}
            </span>
            <span style={{color: ServerStatesColor[serverState]}}>
              {serverState}
            </span>
          </span>
        </span>
      </Link>
  )}
}

export default ServerNode;
