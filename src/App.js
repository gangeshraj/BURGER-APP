import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './Containers/Checkout/Checkout';
//route routes to various domain andaccoringly renders component
//switch only allows to render one route
//withRouter is important for to get routingprops like history etc;-
//withRouter also debars the routing capability of component barred due to connect
//redirect allows to redirect to some url according to out logic
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
// import Orders from './Containers/Orders/Orders';

//connect helpscomponento connect to central state redux
import {connect} from 'react-redux';
// import Authorization  from './Containers/Auth/Auth';
import Logout  from './Containers/Auth/Logout/Logout';

//it importsall the actions functions used
import * as actions from './store/actions/index';

//it is the function responsible for lazy loading
import asyncComponent from './higherordercomponent/asyncComponent';



//lazy loading
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

  componentDidMount(){//here component is again mounted check user is loggedin
    //itis done by checking browser local storage 
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes=(//if unauthenticated
        <Switch>
              <Route path="/auth" component={asyncAuth}/>
              <Route path="/" exact component={BurgerBuilder}/>
              <Redirect to="/" />
        </Switch>
    )

    if(this.props.isAuthenticated)//if authenticated
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

const mapStateToProps=state=>{//state property telling authentication status
      return {
          isAuthenticated:state.authReducing.token!==null
      }
}

const mapDispatchToProps=dispatch=>{//action getting sign in status
    return {
      onTryAutoSignUp:()=>dispatch(actions.authCheckState())
    }
}


//withRouter isimportant to wrap connect as else routing functionality wontwok properly
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
