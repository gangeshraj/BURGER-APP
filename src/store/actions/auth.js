import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: localId
    };
};

export const authFail = (error) => {
    console.log("getting error",error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem("localId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {//action creators forsignin sign ip
    return dispatch => {
        dispatch(authStart());//invioke authorization started
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        //url for sign up
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
        if (!isSignup) {//url forsign in
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
        }
        axios.post(url, authData)//sign up or sign in
            .then(response => {
                //date nd time 1 hour from response to logout
                const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
                //set local storage of browser
                localStorage.setItem("token",response.data.idToken);
                localStorage.setItem("localId",response.data.localId);
                localStorage.setItem("expirationDate",expirationDate);

                //executing auth success dispatcher
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                //dispatch invoke logging out after the time receivedin firebasein nos like '3600' sec
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {//error receiving response from firebase
                dispatch(authFail(err.response.data.error));
            })
            .catch(err=>{//if not receivedfrom firebase app will crash
                err.message="Some error occured check internet connection";
                dispatch(authFail(err));
            });
    };
};


export const setAuthRedirectPath=(path)=>{
    //console.log("reaching here setting routingpath",path);
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{//run when app.js is monted
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token)
        {
            dispatch(logout);
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            console.log(expirationDate,new Date(),expirationDate<=new Date());
            if(expirationDate<=new Date()){
                alert("ok");
                dispatch(logout())
            }
            else
            {
                const localId=localStorage.getItem('localId');
                dispatch(authSuccess(token,localId))
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime())/1000))
            }
        }
    }
}