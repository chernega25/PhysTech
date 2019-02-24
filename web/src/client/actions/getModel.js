import debug from 'debug';
import {
    FETCH_ERROR,
    FETCH_MODEL
} from './actionTypes';

const consoleDebug = debug('client:actions');

export const getModel = (modelId) => async dispatch => {

    fetch(`/getModels/${modelId}`)
        .then(res => res.json())
        .then((data) => {

            dispatch({
                type: FETCH_MODEL,
                payload: data // {model, family}
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
