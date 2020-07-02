
import{
    GET_EXPENSE_DATA_STATE
}from '../reducerActionTypes/expenseReducerActionTypes'
let initialState = {
    firstLoad : true,
    transactionData:[]
}

export default function expenseState(state=initialState,action){
    const{type,data} = action;
    switch(type){
        case GET_EXPENSE_DATA_STATE:{
            return{
                ...state,
                transactionData:data
            }
        }
        default:
            return state;
    }
}