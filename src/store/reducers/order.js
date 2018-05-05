
import * as actionTypes from '../actions/actionTypes';

const initialState={//initial state status
    orders:[],
    loading:false,
    purchased:false
}

//if state is not given initial state taken by default
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT://if purchasing started purchased is initial false
            return {
                ...state,
                purchased:false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true//trueas started async action
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS://received data from frebase backend successfully
            const newOrder={//get data from action whichreceivesfrom firebase
                ...action.orderData,
                id:action.orderId
            }
            return {
                ...state,
                loading:false,//now loading is falseremoves spinner
                purchased:true,//yes burger is in purchasing statu now
                orders:state.orders.concat(newOrder)//concat creates a deep copy of array in javascript
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {//receiving data from firebasewas not successful
                ...state,
                loading:false,//loading is still false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,//async action
                loading:true//fetching data from fire base started
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;