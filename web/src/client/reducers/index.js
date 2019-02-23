import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data';
import path from './path';
import loader from './loader';

const reducer = combineReducers({
    routing: routerReducer,
    data,
    path,
    loader
});

export default reducer;
