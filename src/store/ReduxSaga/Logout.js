import {delay} from 'redux-saga'
import {put} from 'redux-saga/effects';

import * as actions from '../actions/index';
import { checkAuthTimeout } from '../actions/auth';

export function* logoutSaga(action){
    console.log("inn saga logout")
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem("localId");
    yield put( actions.logoutSucceed() );
}


export function* checkAuthTimeoutSaga(action){
    console.log("in saga timeout");
    yield delay(action.expirationTime*1000);
    console.log("reaching late");
    yield put( actions.logout() )
}