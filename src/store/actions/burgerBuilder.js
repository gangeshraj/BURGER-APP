import * as actionTypes from './actionTypes';
//import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
//import { purchaseBurgerStart } from './order';
//axios for sending http request to our fire base server

export const addIngredients=(ingname)=>{
    const updatedState={
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName:ingname 
    }

    return updatedState;
}

export const removeIngredients=(ingname)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName:ingname 
    }
}

export const setIngredients=(ingredients)=>{

    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients=()=>{
    return {
        type:actionTypes.INIT_INGREDIENTS
    }
}