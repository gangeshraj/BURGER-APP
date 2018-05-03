import React,{Component} from 'react';
import Order from '../../Components/Order/Order';
import axios_instance_for_orders from '../../axios_instance_for_orders';
import WithErrorHandler from '../../higherordercomponent/WithErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orders=<Spinner/>;
        if(!this.props.loading){
            orders=this.props.orders.map(ord=>(//for each jsonorder in array of json
                <Order 
                    key={ord.id}//id property we initialised above is key
                    ingredients={ord.ingredient}//pass ingredient
                    price={ord.price}/>//passprice
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }

}



const mapStateToProps=state=>{
    return{
        orders:state.orderReducing.orders,
        loading:state.orderReducing.loading,
        token:state.authReducing.token,
        userId:state.authReducing.userId
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders:( token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios_instance_for_orders)));