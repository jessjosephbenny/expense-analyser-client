import { SET_TEMPLATE_PATTERN_STATE } from "../reducerActionTypes/expenseReducerActionTypes"
export default function templateState(state={},action){
    switch (action.type) {
        case SET_TEMPLATE_PATTERN_STATE:
          return {
            data: action.data
          }
        default:
          return state
      }
}