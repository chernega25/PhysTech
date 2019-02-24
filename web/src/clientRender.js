/* eslint-disable no-underscore-dangle */
import debug from 'debug';
import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import reducers from './client/reducers';
import matchConfig from './matchConfig';
import './styles.css';
import Sidebar from "./client/containers/Sidebar/Sidebar.jsx";

const consoleDebug = debug('client:rendering');

const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;

const initState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = createStore(
    reducers,
    initState,
    composeEnhancers(applyMiddleware(thunk)),
);

render(
    <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Sidebar />
                    <Switch>
                        {
                            matchConfig.map((route, index) => <Route key={`route${index}`} {...route} />)
                        }
                    </Switch>
                </div>
            </BrowserRouter>
    </Provider>,
    root
);
