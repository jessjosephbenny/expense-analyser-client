import { put, takeLatest, call } from 'redux-saga/effects'
import { WATCH_LOGIN_USER } from "../watcherActionTypes/expenseWatcherActionTypes";
import { SET_LOADING_STATE, SET_AUTH_STATE, UNSET_LOADING_STATE } from "../reducerActionTypes/expenseReducerActionTypes";
import { postServer } from "../server/axiosServer";
import { POST_LOGIN_USER } from '../server/restEndpoints';
export function* watchLoginUser(){
    try{
        yield takeLatest(WATCH_LOGIN_USER,function*({data,callback}){
            yield put({type:SET_LOADING_STATE});
            const response = yield call(postServer,POST_LOGIN_USER,data);
            const token = response.headers['authorization'];
            localStorage.setItem('token',token);
            yield put({type:SET_AUTH_STATE,token});
            yield put({type:UNSET_LOADING_STATE});
            callback();
        })
    }catch(error){
        console.log(error);
    }
}