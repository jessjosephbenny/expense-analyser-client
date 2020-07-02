import{put,takeLatest,call} from 'redux-saga/effects'
import{
 WATCH_GET_EXPENSE_DATA
} from '../watcherActionTypes/expenseWatcherActionTypes'
import {
 GET_EXPENSE_DATA_STATE
} from '../reducerActionTypes/expenseReducerActionTypes'
import {
    GET_EXPENSE_DATA_URL
} from '../server/restEndpoints';
import { getServer } from '../server/axiosServer';


export function* watchGetExpenseData(){
    try{
        yield takeLatest(WATCH_GET_EXPENSE_DATA,function*(){
           const {data} = yield call(getServer,GET_EXPENSE_DATA_URL);
           console.log(data);
           yield put({type:GET_EXPENSE_DATA_STATE,data});
        })
    }
    catch(error){

    }
}