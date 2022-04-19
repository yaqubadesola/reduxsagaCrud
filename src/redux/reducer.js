import { act } from '@testing-library/react';
import * as types from './actiontypes';

const initialState = {
    users:[],
    loading:false,
    error:null
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LOAD_USER_START:
        case types.CREATE_USER_START:
        case types.DELETE_USER_START:
        case types.UPDATE_USER_START:
            return{
                ...state,
                loading: true
            }
        case types.LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                users:action.payload
            }
        case types.CREATE_USER_SUCCESS:
        case types.UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading: false
            }
        case types.DELETE_USER_SUCCESS: 
            console.log("Our Action ", action.payload)
            return{
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !==  action.payload )                
            }
        case types.LOAD_USER_FAIL:
        case types.CREATE_USER_FAIL:
        case types.DELETE_USER_FAIL:
        case types.UPDATE_USER_FAIL:
            return{
                ...state,
                loading: false,
                error:action.payload
            }        
          
    
        default:
            return state;
    }
}

export default userReducer