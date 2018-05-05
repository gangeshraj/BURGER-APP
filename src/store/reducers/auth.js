import * as actionTypes from '../actions/actionTypes';
import { objectDeepCopy } from '../objectDeepCopy';

const initialState = {//initial state
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:"/"
};

const authStart = ( state, action ) => {//deep copy of objects
    return objectDeepCopy( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return objectDeepCopy( state, { 
        token: action.idToken,//getting token from firebase
        userId: action.userId,//getting local idfromm firebase
        error: null,
        loading: false
     } );
};

const authFail = (state, action) => {
    return objectDeepCopy( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return objectDeepCopy(state, { token: null, userId: null });
};

const setAuthRedirectPath=(state,action)=>{
    return objectDeepCopy(state,{authRedirectPath: action.path})
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action)
        default: return state;
    }
};

export default reducer;