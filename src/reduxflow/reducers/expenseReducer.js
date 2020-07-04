
import{
    GET_EXPENSE_DATA_STATE
}from '../reducerActionTypes/expenseReducerActionTypes'
let initialState = {
    firstLoad : true,
    transactionData:[],
    summary:{
        average:0,
        balance:0,
        totalDeposit:0,
        totalWithdrawal:0
    }
}

export default function expenseState(state=initialState,action){
    const{type,data} = action;
    switch(type){
        case GET_EXPENSE_DATA_STATE:{
            return{
                ...state,
                transactionData:data['transactionData'],
                summary:data['summary']
            }
        }
        default:
            return state;
    }
}