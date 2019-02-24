const consoleDebug = require('debug')('server');
const app = (require('express'))();
const env = require('./src/env');

require('css-modules-require-hook')({
    generateScopedName: '[name]_[local]'
});

// initalize webpack dev middleware if in development context
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const config = require('./webpack.config');

    const devMiddleware = require('webpack-dev-middleware');
    const hotDevMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(config);
    const devMiddlewareConfig = {
        noInfo: false,
        stats: { colors: true },
        publicPath: config.output.publicPath
    };

    app.use(devMiddleware(compiler, devMiddlewareConfig));
    app.use(hotDevMiddleware(compiler));
}

app.use(require('express').static('public'));

const serverRender = require('./src/serverRender');
const getListOfModels = require('./src/client/requests/getListOfModels');
const getListOfVariables = require('./src/client/requests/getListOfVariables');
const getModel = require('./src/client/requests/getModel');
const updateObjectFactory = require('./src/client/requests/updateObjectFactory');

app.get('/getModels', getListOfModels);
app.get('/getModels/', getModel);
app.get('/getVariables', getListOfVariables);
app.get('*', serverRender);

app.post('/newModel', updateObjectFactory('newModel'));
app.post('/newVariable', updateObjectFactory('newVariable'));
app.post('/changeModel', updateObjectFactory('changeModel'));
app.post('/changeVariable', updateObjectFactory('changeVariable'));


app.listen(env.port, env.host);
consoleDebug(`Running on http://${env.host}:${env.port}`);
