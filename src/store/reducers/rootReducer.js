import goalReducer from './goalReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    goal: goalReducer,
    user: userReducer
});

export default rootReducer