import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import {connect} from 'react-redux';
import Authorization  from './Containers/Auth/Auth';
import Logout  from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes=(
        <Switch>
              <Route path="/auth" component={Authorization}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
        </Switch>
    )

    if(this.props.isAuthenticated)
        {
            routes=(
              <Switch>
                  <Route path="/orders" component={Orders}/>
                  <Route path="/checkout" component={Checkout}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/auth" component={Authorization}/>
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
