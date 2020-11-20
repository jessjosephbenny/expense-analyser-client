import { takeLatest, put, call } from "redux-saga/effects";
import { WATCH_PREDICT_COLUMN } from "../watcherActionTypes/expenseWatcherActionTypes";
import { POST_PREDICT_COLUMN_GUEST } from "../server/restEndpoints";
import { SET_LOADING_STATE, SET_TEMPLATE_PATTERN_STATE } from "../reducerActionTypes/expenseReducerActionTypes";
import { postFileServer } from "../server/axiosServer";

export function* watchGetColumnPrediction(){
    try{
        yield takeLatest(WATCH_PREDICT_COLUMN,function* (payload){
            yield put({ type: SET_LOADING_STATE});
            const {file} = payload;
            let formData = new FormData();
            formData.append('file',file)
            const { data } = yield call(postFileServer, POST_PREDICT_COLUMN_GUEST,formData);
            yield put({type:SET_TEMPLATE_PATTERN_STATE,data})
        })
    }
    catch(err){
        console.log(err);
    }
}