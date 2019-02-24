import {
    FETCH_LIST_OF_MODELS,
    FETCH_LIST_OF_VARIABLES,
    FETCH_MODEL,
    FETCH_MODEL_ID,
    HISTORY
} from '../actions/actionTypes';

const initialState = {};

export default function data(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_LIST_OF_MODELS:
        case FETCH_MODEL:
        case FETCH_MODEL_ID:
        case FETCH_LIST_OF_VARIABLES:
        case HISTORY:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}
