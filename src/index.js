import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


//process is globally present we are using environment variable to have
const composeEnhancers = process.env.NODE_ENV === 'development' ? // redux dev tool only when in development mode
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    burgerBuilderReducing: burgerBuilderReducer,
    orderReducing: orderReducer,
    authReducing: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    // injecting store in our app
    <Provider store={store}>
    {/* // <BrowserRouter baseName="gangeshburgerapp"> if we want base url for app */}
    <BrowserRouter>
    {/* baseurl for the app is above */}
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
