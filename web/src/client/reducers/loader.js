import { SET_LOADER } from '../actions/actionTypes';

const initialState = true;

export default function loaderReducers(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LOADER:
            return payload;
        default:
            return state;
    }
}
