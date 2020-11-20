import {all} from 'redux-saga/effects';
import {
    watchGetExpenseData,
    watchUploadStatement
 } from './sagas/expenseSaga';
import { watchLoginUser } from './sagas/authSaga';
import { watchGetColumnPrediction } from './sagas/guestSaga';

 export default function* rootSaga(){
     yield all([
         watchGetExpenseData(),
         watchUploadStatement(),
         watchLoginUser(),
         watchGetColumnPrediction()
     ])
 }