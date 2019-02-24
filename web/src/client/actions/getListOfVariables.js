import debug from 'debug';
import {
    FETCH_ERROR,
    FETCH_LIST_OF_VARIABLES
} from './actionTypes';
import {URL} from './constants'

const consoleDebug = debug('client:actions');

export const getListOfVariables = () => async dispatch => {

    fetch(`${URL}/getVariables`)
        .then(res => res.json())
        .then((data) => {

            dispatch({
                type: FETCH_LIST_OF_VARIABLES,
                payload: { listOfVariables: data }
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
