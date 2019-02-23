import { SET_PATH } from '../actions/actionTypes';

const initialState = '';

export default function pathReducers(state = initialState, { type, payload }) {
    switch (type) {
        case SET_PATH:
            return payload;
        default:
            return state;
    }
}
