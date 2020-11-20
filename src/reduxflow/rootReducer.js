import {combineReducers} from 'redux';
import expenseState from './reducers/expenseReducer';
import authState from './reducers/authReducer';
import templateState from './reducers/templateReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    expenseState,
    auth : authState,
    template:templateState,
    form:formReducer
});