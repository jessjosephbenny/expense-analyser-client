
import {
    GET_EXPENSE_DATA_STATE, SET_LOADING_STATE, GET_DAILY_DATA, UNSET_LOADING_STATE
} from '../reducerActionTypes/expenseReducerActionTypes'

const makeDailyUsage = (data) => {
    const yearlyUsage = Object.keys(data['year']).map(year => {
        return {
            year: new Date(parseInt(year), 0),
            expense: data['year'][year]
        }
    })
    const monthlyUsage = Object.keys(data['month']).map(month => {
        return {
            month: new Date(parseInt(month.split('/')[1]), parseInt(month.split('/')[0] - 1)),
            expense: data['month'][month]
        }
    });
    const dailyUsage = Object.keys(data['Daily']).map(date => {
        return {
            date: new Date(parseInt(date.split('-')[0]), parseInt(date.split('-')[1]), parseInt(date.split('-')[2])),
            expense: data['Daily'][date]
        }
    })
    dailyUsage.sort((a, b) => {
        return a['date'] - b['date']
    });
    return {
        daily: dailyUsage,
        monthly: monthlyUsage,
        yearly: yearlyUsage
    }
}
let initialState = {
    firstLoad: true,
    loading: false,
    transactionData: null,
    dailyUsage: null,
    summary: {
        average: 0,
        balance: 0,
        totalDeposit: 0,
        totalWithdrawal: 0
    },
    classification: {

    },
    topKeywords:[]
}

export default function expenseState(state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case GET_EXPENSE_DATA_STATE: {
            if (data['transactionData'].length > 0)
                return {
                    ...state,
                    transactionData: data['transactionData'],
                    summary: data['summary'],
                    classification: data['Classification'],
                    topKeywords : data['topKeywords'],
                    firstLoad: false,
                    loading: false
                }
            else {
                return {
                    ...state,
                    transactionData: [],
                    loading: false
                }
            }
        }
        case GET_DAILY_DATA:
            if (action['dailyUsage']) {
                const dailyUsage = makeDailyUsage(action['dailyUsage']);
                return {
                    ...state,
                    dailyUsage
                }
            }
            else
                return state;
        case SET_LOADING_STATE: {
            return {
                ...state,
                loading: true
            }
        }
        case UNSET_LOADING_STATE: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    }
}