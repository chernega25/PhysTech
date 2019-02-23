import debug from 'debug';
import {
    FETCH_ERROR,
    FETCH_LIST_OF_MODELS
} from './actionTypes';

const consoleDebug = debug('client:actions');

export const getListOfModels = () => async dispatch => {

    fetch('/models')
        .then(res => res.json())
        .then(([listOfModels, listOfCurrentModels]) => {

            dispatch({
                type: FETCH_LIST_OF_MODELS,
                payload: { listOfModels, listOfCurrentModels }
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
