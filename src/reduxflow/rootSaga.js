import {all} from 'redux-saga/effects';
import {
    watchGetExpenseData
 } from './sagas/expenseSaga';

 export default function* rootSaga(){
     yield all([
         watchGetExpenseData()
     ])
 }