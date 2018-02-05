const AppRoutes = {
  ROOT:             '/',
  SIGNIN:           '/signin/',
  SERVER_LIST:      '/servers-list/',
  SERVER_MAP:       '/servers-map/',
  SERVER_MAP_PARAM: '/servers-map/:serverId',
  SERVER_ID:        '/servers/',
  SERVER_ID_PARAM:  '/servers/:serverId',
};

export const DefaultRoutes = {
  auth:   AppRoutes.SERVER_LIST,
  unauth: AppRoutes.SIGNIN,
};

export default AppRoutes;
