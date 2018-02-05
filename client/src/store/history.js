import createHistory from 'history/createHashHistory';

const history = createHistory();
export default history;

export const goTo = (route) => {
  history.push(route);
};

export const goToGenerator = (route) => {
  return () => goTo(route);
};
