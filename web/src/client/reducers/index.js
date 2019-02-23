import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fetchReducer from "./fetchReducer";


const reducer = combineReducers({
    routing: routerReducer,
    fetchReducer
});

export default reducer;
