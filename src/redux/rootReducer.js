import userReducer from './reducer';
import  {combineReducers} from 'redux';

const rootReducer = combineReducers({
    users:userReducer
})

export default rootReducer  