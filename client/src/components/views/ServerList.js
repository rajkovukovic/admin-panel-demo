import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ServerNode from './ServerNode';

/* eslint-disable */

class ServerList extends Component {
  static propTypes = {
    nodes: PropTypes.array,
  }

  static defaultProps = {
    nodes: [],
  }

  render () {
    const { nodes } = this.props;
    // console.log(nodes);
    return (
      <div className="ServerList">
        {nodes.map(node => (
          <ServerNode
            key={node.serverId}
            serverId={node.serverId}
            name={node.name}
            uptime={node.uptime}
            state={node.state}
          />
        ))}
      </div>
  )}
}

export default ServerList;
