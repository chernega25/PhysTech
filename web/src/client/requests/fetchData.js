import debug from 'debug';
const fetch = require('isomorphic-fetch');

const consoleDebug = debug('server:sendingToClient');

const API_URL = '';

/**
 * Отправляет (res.send()) данные полученные от API
 * @name fetchData
 * @function
 * @param {object} request
 * @param {object} response
 */
const fetchData = (req, res) => {
    consoleDebug(req.url.substr(8));

    fetch(`${API_URL}${req.url.substr(8)}`)
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

module.exports = fetchData;
