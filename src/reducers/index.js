import {combineReducers} from 'redux';
import user from './userReducer';
import rooms from './roomReducer';
import members from './memberReducer';
import messages from './messageReducer';
import routesPermissions from './routesPermissionsReducer';
import auth from './authReducer';

import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
  routing: routerReducer,
  routesPermissions,
  user,
  auth,
  messages,
  rooms,
  members,
  ajaxCallsInProgress
});

export default rootReducer;
