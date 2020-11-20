import { SET_AUTH_STATE, SET_USER_LOGOUT } from "../reducerActionTypes/expenseReducerActionTypes";

const initialState = {
    authToken : '',
    authenticated : false
}
export default function authState(state = initialState,action){
    switch(action.type){
        case SET_AUTH_STATE:
            if(action.token === "")
            return{
                ...state,
                authToken: "",
                authenticated: false
            }
            else{
                return{
                    ...state,
                    authToken:action.token,
                    authenticated:true
                }
            }
        case SET_USER_LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                authToken:"",
                authenticated:false
            }
        default:
            return state;
    }
}