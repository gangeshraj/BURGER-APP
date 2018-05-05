import * as actionTypes from '../actions/actionTypes';
import {objectDeepCopy } from '../objectDeepCopy';

//global pricing of burger ingredients
const INGREDIENT_PRICE={
    salad:1.2,
    bacon:1.5,
    cheese:2.1,
    meat:2.5
}

const initial_state={
    /* cut from BURGER BUILDER */
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    total_price:4,//base price which is always 4 without any ingredients 
    //and it have theprice of the whole burger,
    error:false,
    building:false
};


const reducer=(state=initial_state,action)=>{

    switch(action.type){
            case actionTypes.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        // in es6 javascript to overRide 
                        //javascript object any property by this
                        //special syntax
                        [action.ingredientName]:state.ingredients[action.ingredientName]+1
                    },
                    //burger price is current price + ingredient pricewhich is added
                    total_price:state.total_price+INGREDIENT_PRICE[action.ingredientName],
                    building:true//building of burger started
                };
            case actionTypes.REMOVE_INGREDIENTS:
                // using object deep copying function
                // const updatedIngredient={[action.ingredientName]:state.ingredients[action.ingredientName]-1}
                // const updatedIngredients=objectDeepCopy(state.ingredients,updatedIngredient);
                // const updatedState={
                //     ingredients:updatedIngredients,
                //     total_price:state.total_price-INGREDIENT_PRICE[action.ingredientName]
                // }
                // return objectDeepCopy(state,updatedState);
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        // in es6 javascript to overRide 
                        //javascript object any property by this
                        //special syntax
                        [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    },
                    total_price:state.total_price-INGREDIENT_PRICE[action.ingredientName],
                    building:true
                    };
            case actionTypes.SET_INGREDIENTS:

                //object.keys iterates on object properties
                let updated_price=Object.keys(action.ingredients)
                .map(el=>{//returns array of prices by each ingredient type
                    return action.ingredients[el]*INGREDIENT_PRICE[el]
                }).reduce((add,el)=>{//reducing 1st argument is function with twoarguments
                    //1st is add variable returned at last 
                    //el is each element of array returned by map above
                    return add+el
                },0)

                updated_price=updated_price+4;//add base price alwaysthere if burger not have ingredients

                return {
                    ...state,
                    ingredients:action.ingredients,
                    //below code its not relevant to here but to remember
                    // // in es6 javascript to overRide 
                    // //javascript object any property by this
                    // //special syntax
                    // [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                    total_price:updated_price,
                    error:false,
                    building:false
                };
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return {
                    ...state,
                    error:true
                }
            default: 
                return state;  
    }

};

export default reducer;