import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from "./data";


const reducer = combineReducers({
    routing: routerReducer,
    fetchReducer: data
});

export default reducer;
