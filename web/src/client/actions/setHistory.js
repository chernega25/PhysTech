import debug from 'debug';
import {
    HISTORY
} from './actionTypes';

export const setHistory = history => async dispatch => {

    dispatch({
        type: HISTORY,
        payload: { history },
    });
};
