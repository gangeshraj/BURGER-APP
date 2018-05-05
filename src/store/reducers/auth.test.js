import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth Reducer',()=>{
    it('should return initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath:"/"
        });
    });

    it('should store token upon login',()=>{
        expect(reducer({
                token: null,
                userId: null,
                error: null,
                loading: false,
                authRedirectPath:"/"
        },{
            type:actionTypes.AUTH_SUCCESS,
            idToken:"someIdToken",
            userId:"someUserId"
        })).toEqual({
            token: "someIdToken",
            userId: "someUserId",
            error: null,
            loading: false,
            authRedirectPath:"/"
        });
    });



});