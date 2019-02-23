import { FETCH_DATA } from '../actions/actionTypes';

const initialState = [];

export default function epicsReducers(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_DATA:
            return payload;
        default:
            return state;
    }
}
