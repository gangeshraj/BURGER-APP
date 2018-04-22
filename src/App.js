import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      // <BrowserRouter baseName="gangeshburgerapp"> if we want base url for app
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
    );
  }
}

export default App;
