import debug from 'debug';
import {API_URL} from "./constants";
import fetch from './fetch';

const consoleDebug = debug('server:sendingToClient');

/**
 * Отправляет (res.send()) данные полученные от API
 * @name getListOfVariables
 * @function
 * @param {object} req
 * @param {object} res
 */

const getListOfVariables = (req, res) => {

    fetch(`${API_URL}/getListOfVariables`)
        .catch(error => {
            consoleDebug(`Fetch data:${error} `);
        })
        .then(data => data.json())
        .catch(error => {
            consoleDebug(`Parse data:${error} `);
        })
        .then(data => res.send(data))
        .catch(error => {
            consoleDebug(`Send data:${error} `);
        });
};

module.exports = getListOfVariables;
