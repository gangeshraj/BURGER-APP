import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './Containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
// import Orders from './Containers/Orders/Orders';
import {connect} from 'react-redux';
// import Authorization  from './Containers/Auth/Auth';
import Logout  from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './higherordercomponent/asyncComponent';


const asyncCheckout=asyncComponent(()=>{
    return import ('./Containers/Checkout/Checkout');
})

const asyncOrders=asyncComponent(()=>{
    return import ('./Containers/Orders/Orders');
})

const asyncAuth=asyncComponent(()=>{
    return import ('./Containers/Auth/Auth');
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes=(
        <Switch>
              <Route path="/auth" component={asyncAuth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
        </Switch>
    )

    if(this.props.isAuthenticated)
        {
            routes=(
              <Switch>
                  <Route path="/orders" component={asyncOrders}/>
                  <Route path="/checkout" component={asyncCheckout}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/auth" component={asyncAuth}/>
                  <Route path="/" exact component={BurgerBuilder}/>
                  <Redirect to="/" />
                  {/* the above component is responsible for burger  */}
              </Switch>
            )
        }


    return (
          <Layout>
              {routes}
          </Layout>
    );

  }


}

const mapStateToProps=state=>{
      return {
          isAuthenticated:state.authReducing.token!==null
      }
}

const mapDispatchToProps=dispatch=>{
    return {
      onTryAutoSignUp:()=>dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
