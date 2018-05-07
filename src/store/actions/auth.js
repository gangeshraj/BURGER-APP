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
    // console.log("getting error",error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // console.log("in actions logout");
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    // console.log("in actions logout succeed");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    // console.log("in actions time out")
    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:15
    }
};

export const auth = (email, password, isSignup) => {//action creators forsignin sign ip
    return {
        type:actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSignup:isSignup
    }
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
            // console.log("applying");
            dispatch(logout);
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            // console.log(expirationDate,new Date(),expirationDate<=new Date());
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