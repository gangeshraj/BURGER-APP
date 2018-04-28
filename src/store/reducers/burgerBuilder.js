import * as actionTypes from '../actions/actionTypes';



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
    error:false
};


const reducer=(state=initial_state,action)=>{
    console.log("in reducer");
    switch(action.type){
            case actionTypes.ADD_INGREDIENTS:
            console.log("here receiving",action.ingredientName);
                const updatedState= {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        // in es6 javascript to overRide 
                        //javascript object any property by this
                        //special syntax
                        [action.ingredientName]:state.ingredients[action.ingredientName]+1
                    },
                    total_price:state.total_price+INGREDIENT_PRICE[action.ingredientName]
                };
                console.log("the updatedstate are",updatedState);
                return updatedState;
            case actionTypes.REMOVE_INGREDIENTS:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        // in es6 javascript to overRide 
                        //javascript object any property by this
                        //special syntax
                        [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    },
                    total_price:state.total_price-INGREDIENT_PRICE[action.ingredientName]
                    };
            case actionTypes.SET_INGREDIENTS:
                return {
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        ingredients:action.ingredients,
                        error:false
                        //below code its not relevant to here but to remember
                        // // in es6 javascript to overRide 
                        // //javascript object any property by this
                        // //special syntax
                        // [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    }
                };
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return {
                    ...state,
                    error:true
                }
            default: return state;  
    }

};

export default reducer;