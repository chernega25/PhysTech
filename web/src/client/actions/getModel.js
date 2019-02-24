import debug from 'debug';
import {
    FETCH_ERROR,
    FETCH_MODEL
} from './actionTypes';
import {URL} from './constants'

const consoleDebug = debug('client:actions');

export const getModel = (modelId) => async dispatch => {

    console.log(modelId);
    fetch(`${URL}/getModelById/${modelId}`)
        .catch(error => {
            consoleDebug(`Fetch data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
        })
        .then(res => res.json())
        .then(({ model, family }) => {
            consoleDebug(model);
            dispatch({
                type: FETCH_MODEL,
                payload: { model, family }
            });
        })
        .catch(error => {
            consoleDebug(`Parse data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
        });
};
