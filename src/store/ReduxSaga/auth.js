import {delay} from 'redux-saga'
import {put,call} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';
import { checkAuthTimeout } from '../actions/auth';

export function* logoutSaga(action){
    // console.log("inn saga logout")
    //yield localStorage.removeItem('token');
    yield call([localStorage,'removeItem'],"token");//advantage of the syntax is we can mock it and test it
    //not always run as we do in below syntaxes
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem("localId");
    yield put( actions.logoutSucceed() );
}


export function* checkAuthTimeoutSaga(action){
    // console.log("in saga timeout");
    yield delay(action.expirationTime*1000);
    // console.log("reaching late");
    yield put( actions.logout() )
}


export function* authSaga(action){
    // console.log("in saga timeout");
    yield put(actions.authStart());
    // console.log("reaching late");
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    //url for sign up
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
    if (!action.isSignup) {//url forsign in
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
    }

    //yield here is next gen javascript feature now axios.post not returns a promise 
    //because yield pauses till promise resolves or rejects  and now response has either resolve or reject result
    try
    {
        try{
        const response=yield axios.post(url, authData);//sign up or sign in
            //.then(response => {
            //date nd time 1 hour from response to logout
            const expirationDate=yield new Date(new Date().getTime()+response.data.expiresIn*1000);
            //set local storage of browser
            localStorage.setItem("token",response.data.idToken);
            localStorage.setItem("localId",response.data.localId);
            localStorage.setItem("expirationDate",expirationDate);
            //console.log("here dispatching logout or authorization afterlogging in")
            //executing auth success dispatcher

            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            //dispatch invoke logging out after the time receivedin firebasein nos like '3600' sec
            yield put(actions.checkAuthTimeout(response.data.expiresIn));
        //})
        }
        catch (err ){//error receiving response from firebase
            yield put(actions.authFail(err.response.data.error));
        }
    }
    catch (err ){//if not receivedfrom firebase app will crash
        err.message="Some error occured check internet connection";
        yield put(actions.authFail(err));
    };
    
}


export function* authCheckStateSaga( action ){
    
        const token=yield localStorage.getItem('token');
        if(!token)
        {
            // console.log("applying");
            yield put(actions.logout())
        }
        else{
            const expirationDate=yield new Date(localStorage.getItem('expirationDate'));
            // console.log(expirationDate,new Date(),expirationDate<=new Date());
            if(expirationDate<=new Date()){
                //alert("ok");
                yield put (actions.logout())
            }
            else
            {
                const localId=yield localStorage.getItem('localId');
                yield put(actions.authSuccess(token,localId))
                yield put(actions.checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
}
