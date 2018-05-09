import { put } from "redux-saga/effects";
import axios_instance_for_orders from '../../axios_instance_for_orders';
import * as actions from "../actions";


//function generator 
export function* purchaseBurgerSaga(action) {//run this action when purchased burger 
  //invoked by listeners in store/index.js
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios_instance_for_orders.post(//post the burger data with 
      //contact form data to firebase using token as authorization firebase backend has rules
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {//run this action when purchased burger 
  //invoked by listeners in store/index.js
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {//getting the orders from firebase filtering on the basis of query params 
    //yield keyword waits till promise resolves or rejects
    const response = yield axios_instance_for_orders.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],//key is themain property which contains order content
        id: key//unique key of each order in firebase
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
