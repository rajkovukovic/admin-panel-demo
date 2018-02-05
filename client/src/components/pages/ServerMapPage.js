import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import { goTo } from '../../store/history';
import AppRoutes from '../../constants/routes';
import AppHOC from './AppHOC';
import googleMapsApiKey from '../../../.idea/googleMapKey';
import ServerMapMarker from '../ui/ServerMapMarker';

/* eslint-disable */
class ServerListPage extends Component {
  static propTypes = {
    servers: PropTypes.array,
  }

  static defaultProps = {
    servers: [],
  }

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(markerId) {
    if (this.activeServerId === markerId) { return; }
    this.activeServerId = markerId;
    goTo(AppRoutes.SERVER_ID + markerId);
  }

  render () {
    const { match, servers } = this.props;
    const activeServerId = match && match.params && match.params.serverId;
    this.activeServerId = activeServerId;
    let activeServer = null;
    const markers = servers.map(server => {
      const isActive = activeServerId === server.serverId;
      if (isActive) {
        activeServer = server;
      }
      return (
        <ServerMapMarker
          key={server.serverId}
          node={server}
          lat={server.location.lat}
          lng={server.location.lon}
          isActive={isActive}
        />
      )}
    );
    return (
      <AppHOC
        title="Servers Map"
        activeRoute={AppRoutes.SERVER_MAP}
        content={
          <GoogleMap
            bootstrapURLKeys={{key: googleMapsApiKey}}
            zoom={activeServer ? 5 : 4}
            center={{
              lat: activeServer ? activeServer.location.lat : 44.80401,
              lng: activeServer ? activeServer.location.lon : 20.46513
            }}
            onChildClick={this.onMarkerClick}
          >
            {markers}
          </GoogleMap>
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    servers: Array.from(state.servers.values()),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerListPage);
