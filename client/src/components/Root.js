import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppRoutes, { DefaultRoutes } from '../constants/routes';
import SigninPage from './pages/SigninPage';
import ServerNodePage from './pages/ServerNodePage';
import ServerListPage from './pages/ServerListPage';
import ServerMapPage from './pages/ServerMapPage';
// import NotFoundView from './views/NotFoundView';
import * as AuthActions from '../store/actionCreators/authActionCreator';
import { AuthType } from '../store/constants/authActionNames';
import { goTo } from '../store/history';
import { Colors } from '../constants/style';

/* eslint-disable */

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.primary,
    primary2Color: Colors.primary,
    primary3Color: Colors.primary,
  },
});

const AuthRoutes = () => {
  return (
    <Fragment>
      <Route exact path={AppRoutes.SERVER_LIST} component={ServerListPage} />
      <Route exact path={AppRoutes.SERVER_ID_PARAM} component={ServerNodePage} />
      <Route exact path={AppRoutes.SERVER_MAP_PARAM} component={ServerMapPage} />
      <Route exact path={AppRoutes.SERVER_MAP} component={ServerMapPage} />
      <Route exact path={AppRoutes.SIGNIN} render={() => <Redirect to={AppRoutes.SERVER_LIST} />} />
      <Route exact path={AppRoutes.ROOT} render={() => <Redirect to={AppRoutes.SERVER_LIST} />} />
      {/* <Route path="*" render={() => <Redirect to={AppRoutes.SERVER_LIST} />} /> */}
      {/* <Route path="*" component={NotFoundView} /> */}
    </Fragment>
  );
};

const UnAuthRoutes = () => {
  return (
    <Fragment>
      <Route exact path={AppRoutes.SIGNIN} component={SigninPage} />
      <Route exact path={AppRoutes.SERVER_LIST} render={() => <Redirect to={AppRoutes.SIGNIN} />} />
      <Route       path={AppRoutes.SERVER_ID} render={() => <Redirect to={AppRoutes.SIGNIN} />} />
      <Route       path={AppRoutes.SERVER_MAP} render={() => <Redirect to={AppRoutes.SIGNIN} />} />
      <Route exact path={AppRoutes.ROOT} render={() => <Redirect to={AppRoutes.SIGNIN} />} />
      {/* <Route path="*" render={() => <Redirect to={AppRoutes.SIGNIN} />} /> */}
      {/* <Route path="*" component={NotFoundView} /> */}
    </Fragment>
  );
};

class Root extends Component {
  static propTypes = {
    authState:             PropTypes.string,
    tokenRead:             PropTypes.bool,
    router:                PropTypes.object,
    checkStorageAuthToken: PropTypes.func.isRequired,
  }

  static defaultProps = {
    authState: AuthType.NONE,
    tokenRead: false,
  }

  componentWillMount() {
    const { tokenRead, checkStorageAuthToken } = this.props;
    if (!tokenRead) {
      checkStorageAuthToken((success) => {
        if (success) {
          goTo(DefaultRoutes.auth);
        }
        else {
          goTo(DefaultRoutes.unauth);
        }
      });
    }
  }

  render () {
    const { authState, router } = this.props;
    if (authState === AuthType.NONE || authState === AuthType.TOKEN) {
      return (<span>Loading...</span>);
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <Switch>
            { authState === AuthType.AUTHENTICATED
              ? <AuthRoutes />
              : <UnAuthRoutes />
            }
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}


function mapStateToProps(state) {
  return {
    tokenRead: state.auth.tokenRead,
    authState: state.auth.authState,
    router:    state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    checkStorageAuthToken: () => dispatch(AuthActions.checkStorageAuthToken()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
