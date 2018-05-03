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

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDjU-5vRMStPrZL1jy6bhy49Z2nQv6ztoM';
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)
                console.log(expirationDate)
                localStorage.setItem("token",response.data.idToken);
                localStorage.setItem("localId",response.data.localId);
                localStorage.setItem("expirationDate",expirationDate);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};


export const setAuthRedirectPath=(path)=>{
    console.log("reaching here setting routingpath",path);
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
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