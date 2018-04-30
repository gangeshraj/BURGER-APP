import * as actionTypes from './actionTypes';
import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
import { purchaseBurgerStart } from './order';
//axios for sending http request to our fire base server

export const addIngredients=(ingname)=>{
    const updatedState={
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName:ingname 
    }
    console.log('updating',updatedState);
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
    return dispatch =>{


        axios_instance_for_orders.get('/ingredients.json')//getting data from firebase backend 
        .then(response=>{//response object from firebase has data property
            console.log("data fetching from server",response.data);
            dispatch(setIngredients(response.data));
            //console.log(this.state.ingredients);
            //     //now price is updated
            //     let updated_price=this.state.total_price+(this.state.ingredients.salad*INGREDINT_PRICE.salad)
            //     +(this.state.ingredients.cheese*INGREDINT_PRICE.cheese)
            //     +(this.state.ingredients.bacon*INGREDINT_PRICE.bacon)
            //     +(this.state.ingredients.meat*INGREDINT_PRICE.meat)
            //     this.setState({total_price:updated_price})
            //     this.updatePurchaseState(this.state.ingredients);//update purchase ability
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed())
        });

    }
}