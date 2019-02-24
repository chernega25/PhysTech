const env = require('./src/env');
module.exports = `http://${env.host}:${env.port}`;