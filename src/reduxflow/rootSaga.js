import {all} from 'redux-saga/effects';
import {
    watchGetExpenseData,
    watchUploadStatement
 } from './sagas/expenseSaga';

 export default function* rootSaga(){
     yield all([
         watchGetExpenseData(),
         watchUploadStatement()
     ])
 }