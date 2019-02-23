import debug from 'debug';
import {API_URL} from "./constants";
import fetch from './fetch';

const consoleDebug = debug('server:sendingToClient');

/**
 * Отправляет (res.send()) данные полученные от API
 * @name getModel
 * @function
 * @param {object} req
 * @param {object} res
 */

const getModel = (req, res) => {

    fetch(`${API_URL}/getModel?modelId=${req.url.substr(9)}`)
        .catch(error => {
            consoleDebug(`Fetch data:${error} `);
        })
        .then(data => data.json())
        .catch(error => {
            consoleDebug(`Parse data:${error} `);
        })
        .then(model => {
            fetch(`${API_URL}/getFamilyOfModels?parentModelId=${model.parentModelId}`)
                .catch(error => {
                    consoleDebug(`Fetch data:${error} `);
                })
                .then(data => data.json())
                .catch(error => {
                    consoleDebug(`Parse data:${error} `);
                })
                .then(family => res.send({ model, family }))
                .catch(error => {
                    consoleDebug(`Send data:${error} `);
                })
        })
};

module.exports = getModel;
