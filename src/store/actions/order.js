import * as actionTypes from './actionTypes';
import axios_instance_for_orders from '../../axios_instance_for_orders';

export const purchaseBurgerSuccess= (id,orderData) =>{

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    };
};

export const purchaseBurgerFail= (error) =>{

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    };
};


export const purchaseBurgerStart= () =>{

    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger=(orderData,token)=>{


    return dispatch=>{
        dispatch(purchaseBurgerStart());

        axios_instance_for_orders.post('/orders.json?auth='+token,orderData)//url appended to our base url received in axios
        .then(response=>
            {
            // this.setState((previousState,props)=>{
            //     return {//this return is not returning ftom function but returning the changed state
            //         loading:false,//loading is true from above so negated to false again,
            //     }
            // })
            //it is able to get history props even we dont directly route this component to
            //Route Component but we use Route render
            // this.props.history.push('/');//going back to main page
            //console.log("response receiving successfully",response);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(error=>{
            // return {
            //     loading:false,//loading is true from above so negated to false again
            // }
            dispatch(purchaseBurgerFail(error));
        }
        )

    }
}

export const purchaseInit=()=>{

    return {
        type:actionTypes.PURCHASE_INIT
    }

}


export const fetchOrdersSuccess=(orders)=>{

    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }

}

export const fetchOrdersFail=(error)=>{

    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }

}

export const fetchOrdersStart=()=>{

    return {
        type:actionTypes.FETCH_ORDERS_START,
    }

}

export const fetchOrders=(token,userId)=>{

    return dispatch=>{

        dispatch(fetchOrdersStart());

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios_instance_for_orders.get( '/orders.json' + queryParams)
        .then(res=>{
                let orders_received=[];//it will contain array ofjson orders
                for(let unique_key_from_firebase in res.data){//getting each order from res.data
                    //res.data will contain json of multiple keys
                    orders_received.push({
                        ...res.data[unique_key_from_firebase],//spreadall key value pAIRS of each order
                        id:unique_key_from_firebase
                    })
                }
                dispatch(fetchOrdersSuccess(orders_received));
        })
        .catch(error=>{
            dispatch(fetchOrdersFail(error));//if unable loaded
        })

    };

}