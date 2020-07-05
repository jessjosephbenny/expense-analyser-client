import { put, takeLatest, call } from 'redux-saga/effects'
import {
    WATCH_GET_EXPENSE_DATA, WATCH_UPLOAD_STATEMENT
} from '../watcherActionTypes/expenseWatcherActionTypes'
import {
    GET_EXPENSE_DATA_STATE, SET_LOADING_STATE
} from '../reducerActionTypes/expenseReducerActionTypes'
import {
    GET_EXPENSE_DATA_URL, POST_UPLOAD_STATEMENT
} from '../server/restEndpoints';
import { getServer, postFileServer } from '../server/axiosServer';


export function* watchGetExpenseData() {
    try {
        yield takeLatest(WATCH_GET_EXPENSE_DATA, function* () {
            const { data } = yield call(getServer, GET_EXPENSE_DATA_URL);
            console.log(data);
            yield put({ type: GET_EXPENSE_DATA_STATE, data });
        })
    }
    catch (error) {

    }
}
export function* watchUploadStatement() {
    try {
        yield takeLatest(WATCH_UPLOAD_STATEMENT, function* (action) {
            yield put({ type: SET_LOADING_STATE});
            const {file} = action;
            let formData = new FormData();
            formData.append('file',file)
            const { data } = yield call(postFileServer, POST_UPLOAD_STATEMENT,formData);
            console.log(data);
            yield put({ type: GET_EXPENSE_DATA_STATE, data });
        })
    }
    catch (error) {

    }
}