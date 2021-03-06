import { put, takeLatest, call } from 'redux-saga/effects'
import {
    WATCH_GET_EXPENSE_DATA, WATCH_UPLOAD_STATEMENT
} from '../watcherActionTypes/expenseWatcherActionTypes'
import {
    GET_EXPENSE_DATA_STATE, SET_LOADING_STATE,GET_DAILY_DATA
} from '../reducerActionTypes/expenseReducerActionTypes'
import {
    GET_EXPENSE_DATA_URL, POST_UPLOAD_STATEMENT
} from '../server/restEndpoints';
import { getServer, postFileServer } from '../server/axiosServer';


export function* watchGetExpenseData() {
    try {
        yield takeLatest(WATCH_GET_EXPENSE_DATA, function* () {
            yield put({ type: SET_LOADING_STATE});
            const { data } = yield call(getServer, GET_EXPENSE_DATA_URL);
            yield put({ type: GET_EXPENSE_DATA_STATE, data });
            const {dailyUsage} = data;
            yield put({type: GET_DAILY_DATA,dailyUsage});
        })
    }
    catch (error) {

    }
}
export function* watchUploadStatement() {
    try {
        yield takeLatest(WATCH_UPLOAD_STATEMENT, function* (action) {
            yield put({ type: SET_LOADING_STATE});
            console.log('from watchUploadStatement',action);
            const {file,template} = action;
            let formData = new FormData();
            formData.append('file',file)
            formData.append('format',template);
            const { data } = yield call(postFileServer, POST_UPLOAD_STATEMENT,formData);
            yield put({ type: GET_EXPENSE_DATA_STATE, data });
            const {dailyUsage} = data;
            yield put({type: GET_DAILY_DATA,dailyUsage});
        })
    }
    catch (error) {

    }
}