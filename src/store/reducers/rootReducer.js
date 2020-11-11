import authReducer from './authReducer'
import contactReducer from './contactReducer'
import {combineReducers} from 'redux'

/** combines two Reducer **/
export default combineReducers({
    auth: authReducer,
    contact: contactReducer
});

// the key name will be the data property on the state object