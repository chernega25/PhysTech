require('babel-register');

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
const fetchData = require('./src/fetchData');

app.get('/getData', fetchData);
app.get('*', serverRender);

app.listen(env.port, env.host);
consoleDebug(`Running on http://${env.host}:${env.port}`);
