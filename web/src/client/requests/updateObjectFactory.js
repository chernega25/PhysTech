import debug from 'debug';
import {API_URL} from "./constants";

const fetch = require('isomorphic-fetch');
const consoleDebug = debug('server:sendingToClient');

const updateObjectFactory = (url) => (req, res) => {
    console.log(req);
    fetch(`${API_URL}/${url}`, {
        method: 'POST',
        body: req.body
    })
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

module.exports = updateObjectFactory;
