import axios_instance_for_orders from '../../axios_instance_for_orders';//use instance of 
import {put } from 'redux-saga/effects'
import { fetchIngredientsFailed, setIngredients } from '../actions/burgerBuilder';

export function* initIngredientsSaga(action){

    try{
    //getting data from firebase backend whenever burger builder componnt is mounted
    const result=yield axios_instance_for_orders.get('/ingredients.json');
    yield put(setIngredients(result.data))
    }
    catch(error){
        yield put(fetchIngredientsFailed())
    }

}