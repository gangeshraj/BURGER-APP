import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';//used to wrap where we are using routing
import { Provider } from 'react-redux';//it injects central store REDUX in our react app
//create store creates a cenral store redux to be used
//apply middle wares help us to use middle wares between reducers and actions
//compose isdefault variable if the redux dev tools is not
//combine reducers combine all state in different reducers to be passed in central stte redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//it is a middle ware library helping us run async middleware action usingaction creators
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

import createSagaMiddleware from 'redux-saga';
import {watchLogout} from './store/ReduxSaga';


//process is globally present we are using environment variable to have
const composeEnhancers = process.env.NODE_ENV === 'development' ? // redux dev tool only when in development mode
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;


//combine all reducers into one and pass to central state
const rootReducer = combineReducers({
    burgerBuilderReducing: burgerBuilderReducer,
    orderReducing: orderReducer,
    authReducing: authReducer
});


const sagaMiddleWare=createSagaMiddleware();

//central state reducers and appliedmidddlewares
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk,sagaMiddleWare)
));

sagaMiddleWare.run(watchLogout);

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

//render to dom
ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
