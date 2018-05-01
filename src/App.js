import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware ,compose ,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import Authorization  from './Containers/Auth/Auth'


class App extends Component {

  render() {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    let rootReducer=combineReducers({
      burgerBuilderReducing:burgerBuilderReducer,
      orderReducing:orderReducer,
      authReducing:authReducer
    })

    const store=createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk)
    ));

    return (
      // injecting store in our app
      <Provider store={store}>
        {/* // <BrowserRouter baseName="gangeshburgerapp"> if we want base url for app */}
        <BrowserRouter>
        {/* baseurl for the app is above */}
          <Layout>
            <Switch>
              <Route path="/orders" component={Orders}/>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/auth" component={Authorization}/>
              <Route path="/" exact component={BurgerBuilder}/>
              {/* the above component is responsible for burger  */}
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );

  }


}

export default App;
