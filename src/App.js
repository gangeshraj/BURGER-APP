import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import {Provider} from 'react-redux';
import reducer from './store/reducers/burgerBuilder';
import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';


class App extends Component {

  render() {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store=createStore(reducer, composeEnhancers(
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
