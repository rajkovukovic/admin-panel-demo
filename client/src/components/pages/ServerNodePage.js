import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '../ui/CircularProgress';
import AppHOC from './AppHOC';
import AppRoutes from '../../constants/routes';
import { ServerStatesColor } from '../../constants/style';

/* eslint-disable */
class ServerNodePage extends Component {
  static propTypes = {
    servers: PropTypes.any,
  }

  static defaultProps = {
    servers: new Map(),
  }

  render () {
    const { match, servers } = this.props;
    const serverId = match && match.params && match.params.serverId;
    const server = servers.get(serverId);
    if (!server) {
      return (
        <AppHOC
          padding
          content={<div>Server with id {serverId} can not be found</div>}
        />
      )
    }
    const { name, uptime, state: serverState, ip, lastTimeSeen, lastMessage, location } = server;
    const uptime100 = 100 * uptime;
    const uptimeFraction1 = Math.floor((uptime100 % 1) * 100);
    return (
      <AppHOC
        padding
        activeRoute={AppRoutes.SERVER_LIST}
        content={(
          <div className="ServerNodePage">
            <CircularProgress
              className="ServerListNodePieChart"
              value={uptime * 100}
              size={160}
              lineWidth={6}
              color={ServerStatesColor[serverState]}
            />
            <div className="ListItems">
              <span className="ServerListNodeInfo">
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'name: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {name}
                  </span>
                </span>
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'state: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {serverState}
                  </span>
                </span>
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'server id: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {serverId}
                  </span>
                </span>
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'ip address: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {ip}
                  </span>
                </span>
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'last seen: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {lastTimeSeen ? lastTimeSeen.fromNow() : 'now'}
                  </span>
                </span>
                <span className="ServerListNodeInfoRow">
                  <span className="ServerListNodeInfo_Title">
                    {'last message: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {lastMessage}
                  </span>
                </span>
                <Link
                  className="ServerListNodeInfoRow ServerListNodeInfoRow--hoverable"
                  title="Show on a map"
                  to={AppRoutes.SERVER_MAP + serverId}
                >
                  <span className="ServerListNodeInfo_Title">
                    {'location: '}
                  </span>
                  <span
                    className="ServerListNodeInfo_Content"
                    style={{color: ServerStatesColor[serverState]}}
                  >
                    {`${location.city}, ${location.country}`}
                  </span>
                </Link>
              </span>
            </div>
          </div>
        )}
      />
    );
  }
}

// serverId:     serverId,
//     name:         `Server ${i + 1}`,
//     uptime:       0.9 + (Math.random() * 0.1),
//     stateIndex:   stateIndex,
//     state:        serverStateValues[stateIndex],
//     ip:           generateIP(),
//     lastTimeSeen: currentTime.add(Math.floor(-24 * Math.random(), 'hours')),
//     lastMessage:  `Last message ${i + 1}`,
//     location:     cities[i],

// export default ServerNodePage;

function mapStateToProps(state) {
  return {
    servers:state.servers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerNodePage);
