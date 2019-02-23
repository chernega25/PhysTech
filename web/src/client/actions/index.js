import debug from 'debug';
import {
    FETCH_DATA,
    FETCH_ERROR,
    SET_PATH,
    SET_LOADER
} from './actionTypes';

const consoleDebug = debug('client:actions');

export const setPath = path => async dispatch => {
    dispatch({
        type: SET_PATH,
        payload: path
    });
};

export const fetchData = path => async dispatch => {
    dispatch({
        type: SET_LOADER,
        payload: true
    });

    fetch(`/getData${path}`)
        .then(res => res.json())
        .then(([dataURL, dataName, dataAge, dataDate]) => {
            const data = [dataURL, dataName, dataAge, dataDate];

            dispatch({
                type: FETCH_DATA,
                payload: data
            });

            dispatch({
                type: SET_LOADER,
                payload: false
            });
        })
        .catch(error => {
            consoleDebug(`Fetch data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
        });
};
