import debug from 'debug';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    StaticRouter,
    Route,
    Switch
} from 'react-router-dom';
import 'isomorphic-fetch';
import reducers from './client/reducers';
import matchConfig from './matchConfig';
import {
    FETCH_DATA,
    FETCH_ERROR,
    SET_LOADER
} from './client/actions/actionTypes';
import './styles.css';

const consoleDebug = debug('server:rendering');

const API_URL = '';

const serverRender = (req, res) => {
    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk))
    );


    //get data from server
    Promise.resolve(req.url)
        .then(url => url.substr(0, 11))
        .then(path => {
            if (path === '/data') {

                store.dispatch({
                    type: SET_LOADER,
                    payload: true
                });

                return fetch(`API_URL${path}`)
                    .then(data => data.json());
            } return Promise.resolve([]);
        })
        .then(data => {
            if (data) {
                store.dispatch({
                    type: FETCH_DATA,
                    payload: data
                });

                store.dispatch({
                    type: SET_LOADER,
                    payload: false
                });
            }
        })
        .catch(error => {
            store.dispatch({
                type: FETCH_ERROR,
                payload: error,
                error: true
            });
            consoleDebug(`Promise error: ${error}`);
        })
        .then(() => {
            renderStoreRouter(store, req, res);
        });

    function renderStoreRouter(store, req, res) {
        const context = {};
        const componentStr = ReactDOMServer.renderToString(<Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <Switch>
                    {
                        matchConfig.map((route, index) => <Route key={`route${index}`} {...route} />)
                    }
                </Switch>
            </StaticRouter>
        </Provider>);

        res.send(renderFullPage(componentStr, store.getState()));
    }


    function renderFullPage(html, preloadedState) {
        return (
            `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <link rel="shortcut icon" href="/static/favicon.ico">
                    <title>WEB</title>
                    <link rel="stylesheet" type="text/css" href="/static/bundle.css">
                </head>
                <body>
                    <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
                    <script>
                        // WARNING: See the following for security issues around embedding JSON in HTML:
                        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
                    </script>
                    <script src="/static/vendor.js"></script>
                    <script src="/static/bundle.js"></script>
                </body>
            </html>
            `
        );
    }
};

module.exports = serverRender;
