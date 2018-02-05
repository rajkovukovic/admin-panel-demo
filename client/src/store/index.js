// redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// redux-thunk
import reduxThunk from 'redux-thunk';
// redux promise
import promiseMiddleware from 'redux-promise-middleware';
// react-router
import { routerReducer, routerMiddleware } from 'react-router-redux';
// redux-logger
import { createLogger } from 'redux-logger';
// reducers
import { reducer as reduxFormReducer } from 'redux-form';
// browser history
import history from './history';
import reducers from './reducers';

const LOG_REDUX_TO_CONSOLE = false;

// Creating middleware for store
const middlewareArray = [
  routerMiddleware(history), // middleware for intercepting and dispatching navigation actions
  reduxThunk,
  promiseMiddleware(),
];
// Creating redux logger for logging state changes to console
const reduxLogger = createLogger({
  duration:  true, // print the duration of each action?
  timestamp: true, // print the timestamp with each action?
  logErrors: true, // should the logger catch, log, and re-throw errors?
  diff:      true, // show diff between states?
  color:     false,
});
// if development - adding redux logger middleware for logging store action and state changes
if (LOG_REDUX_TO_CONSOLE && process.env.NODE_ENV !== 'production') {
  middlewareArray.push(reduxLogger);
}
// if development - Connecting to Redux browser extension
const LOG_REDUX_TO_BROWSER_EXTENSION = true;
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && LOG_REDUX_TO_BROWSER_EXTENSION
    // eslint-disable-next-line
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

// Add the routerReducer to your store on the `router` key
// Also apply routerMiddleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    form:   reduxFormReducer, // mounted under "form"
  }),
  composeEnhancers(applyMiddleware(...middlewareArray)),
);

export default store;
