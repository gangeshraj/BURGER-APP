import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';//to show nested routes we need to have route
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';


class Checkout extends Component{
    // state={ will be managed by redux
    //     // ingredients:{},//ingredients willbe loaded from firebase
    //     totalPrice:0 //price is 0 initially
    // }

    // componentDidMount(){
    //     //get ingrdients from url
    //     //URLSearchParams is default property of javascript
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients_from_url={};
    //     let price=0;
    //     for(let param of query.entries()){//returns[key,value]
    //         if(param[0]==='price')
    //             price=param[1];    
    //         else
    //             ingredients_from_url[param[0]]=+param[1]//populating ingredients json
    //     }
    //     this.setState({ingredients:ingredients_from_url,totalPrice:price});//set dtate of ingredients and the price
    // }


    checkOutCancelledHandler=()=>{
            this.props.history.goBack();//go backto the main page 
    }
    
    checkOutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');//now go to form page for user to add contacts
    }

    render(){

        const purchasedRedirect=this.props.purchased?<Redirect to="/"/>:null;
        console.log("purchasedRedirect",purchasedRedirect)
        return (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings} 
                checkOutCancelled={this.checkOutCancelledHandler}
                checkOutContinued={this.checkOutContinuedHandler}/>
                {/* passing data between pages using render
                    from below code and nesting of routing where url is appended dynaically from parent component */}
                {/* <Route //used before redux now redux code is below
                    path={this.props.match.path +'/contact-data'}
                    render={(props)=>
                    <ContactData 
                    {...props}
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}/>}/> */}
                <Route
                    path={this.props.match.path +'/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilderReducing.ingredients,
        purchased:state.orderReducing.purchased
    }
}



export default connect(mapStateToProps)(Checkout);
