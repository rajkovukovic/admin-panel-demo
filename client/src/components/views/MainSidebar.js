import React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../../constants/routes';

/* eslint-disable */

const MainSidebar = (props) => (
  <nav className="MainSidebar">
    <Link
      to={AppRoutes.SERVER_LIST}
      className={`MainSidebarButton ${props.activeRoute === AppRoutes.SERVER_LIST ? 'MainSidebarButton--active' : ''}`}
    >
      <i className="MainSidebarButtonIcon fas fa-server" />
      <span className="MainSidebarButtonText">Servers</span>
    </Link>
    <Link
      to={AppRoutes.SERVER_MAP}
      className={`MainSidebarButton ${props.activeRoute === AppRoutes.SERVER_MAP ? 'MainSidebarButton--active' : ''}`}
    >
      <i className="MainSidebarButtonIcon fas fa-map-marker-alt" />
      <span className="MainSidebarButtonText">Map</span>
    </Link>
  </nav>
);

export default MainSidebar;
