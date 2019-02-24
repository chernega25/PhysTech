import debug from 'debug';
import {API_URL} from "./constants";

const fetch = require('isomorphic-fetch');
const consoleDebug = debug('server:sendingToClient');

/**
 * Отправляет (res.send()) данные полученные от API
 * @name getModel
 * @function
 * @param {object} req
 * @param {object} res
 */

const getModel = (req, res) => {
    consoleDebug(req.url.substr(15));
    fetch(`${API_URL}/getModel?modelId=${req.url.substr(14)}`)
        .catch(error => {
            consoleDebug(`Fetch data:${error} `);
        })
        .then(data => data.json())
        .catch(error => {
            consoleDebug(`Parse data:${error} `);
        })
        .then(model => {
            console.log(model);
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
