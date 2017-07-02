export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  messages: {
    data:{},
    lastFetched: null,
    isFetching: false
  },
  rooms: {
    data:[],
    lastFetched: null,
    isFetching: false
  },
  members: {
    data:[],
    lastFetched: null,
    isFetching: false
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0
};
