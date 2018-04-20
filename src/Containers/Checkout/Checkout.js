import React,{Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';//to show nested routes
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={
        ingredients:{}
    }

    componentDidMount(){
        //get ingrdients from url
        const query=new URLSearchParams(this.props.location.search);
        const ingredients_from_url={};
        for(let param of query.entries()){//returns[key,value]
            ingredients_from_url[param[0]]=+param[1]//populating ingredients json
        }
        this.setState({ingredients:ingredients_from_url});
    }

    checkOutCancelledHandler=()=>{
            this.props.history.goBack();
    }
    
    checkOutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkOutCancelled={this.checkOutCancelledHandler}
                checkOutContinued={this.checkOutContinuedHandler}/>
                <Route //passing data between pages using render
                    path={this.props.match.path +'/contact-data'}
                    render={()=><ContactData ingredients={this.state.ingredients}/>}/>
            </div>
        );
    }
}

export default Checkout;
