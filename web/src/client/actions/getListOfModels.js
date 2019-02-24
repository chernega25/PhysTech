import debug from 'debug';
import {
    FETCH_ERROR,
    FETCH_LIST_OF_MODELS
} from './actionTypes';

const consoleDebug = debug('client:actions');

export const getListOfModels = () => async dispatch => {
    consoleDebug("wwwwwwwww");

    return fetch(`http://0.0.0.0:8080/getModels`)
        .catch(error => {
            consoleDebug(`Fetch data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            })
        })
        .then(res => res.json())
        .catch(error => {
            consoleDebug(`Parse data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
        })
        .then(([listOfModels, listOfCurrentModels]) => {

            consoleDebug([listOfModels, listOfCurrentModels]);
            
            dispatch({
                type: FETCH_LIST_OF_MODELS,
                payload: { listOfModels, listOfCurrentModels }
            });
        })
        .catch(error => {
            consoleDebug(`Pars data: ${error} `);
            dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
        });
};
