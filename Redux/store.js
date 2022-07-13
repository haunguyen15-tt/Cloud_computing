import { createStore, combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import cartReducer from './reducers/cartReducer';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({ cart: cartReducer, auth: authReducer });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

export default store;
