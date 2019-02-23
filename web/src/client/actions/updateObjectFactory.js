import debug from 'debug';
import {
    FETCH_ERROR
} from './actionTypes';

const consoleDebug = debug('client:actions');

export const updateObjectFactory = (action, object) => (data) => async dispatch => {

    fetch(`/${action}${object}`, {
        method: 'POST',
        body: data
    })
        .then(res => {
            if (res.status === 200)
                return res.json();
            else
                throw {
                    message: "Имя занято",
                    code: res.status
                }

        })
        .then((data) => {

            dispatch({
                type: `FETCH_${object.toUpperCase()}_ID`,
                payload: data // { modelId } or { variableName }
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
