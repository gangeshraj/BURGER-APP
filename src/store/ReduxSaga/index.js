import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {logoutSaga,checkAuthTimeoutSaga} from './Logout'

export function* watchLogout(){

    console.log("in saga listener");
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga)

}