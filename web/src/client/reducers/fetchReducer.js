import {
    FETCH_LIST_OF_MODELS,
    FETCH_LIST_OF_VARIABLES,
    FETCH_MODEL,
    FETCH_MODEL_ID
} from '../actions/actionTypes';

const initialState = {};

export default function fetchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_LIST_OF_MODELS:
            return {
                ...state,
                ...payload
            };
        case FETCH_MODEL:
            return {
                ...state,
                ...payload
            };
        case FETCH_MODEL_ID:
            return {
                ...state,
                ...payload
            };
        case FETCH_LIST_OF_VARIABLES:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}
