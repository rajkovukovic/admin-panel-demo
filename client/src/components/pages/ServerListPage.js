import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppHOC from './AppHOC';
import ServerList from '../views/ServerList';
import AppRoutes from '../../constants/routes';

/* eslint-disable */
class ServerListPage extends Component {
  static propTypes = {
    servers: PropTypes.array,
  }

  static defaultProps = {
    servers: [],
  }

  render () {
    const { servers } = this.props;
    return (
      <AppHOC
        padding
        title="Servers"
        activeRoute={AppRoutes.SERVER_LIST}
        content={<ServerList nodes={servers}/>}
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
