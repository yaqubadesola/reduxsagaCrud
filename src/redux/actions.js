import * as types from './actiontypes';


//All Users Load Actions 
export const loadUsersStart = () => {
    return{
        type:types.LOAD_USER_START
    }
}

export const loadUsersSuccess = (users) => {
    return{
        type:    types.LOAD_USER_SUCCESS,
        payload: users
    }
}

export const loadUsersFail = (error) => {
    return{
        type:    types.LOAD_USER_FAIL,
        payload: error
    }
}


// All Users Create Actions
export const createUserStart = (user) => {
    return{
        type:types.CREATE_USER_START,
        payload:user
    }
}

export const createUserSuccess = () => {
    return{
        type:    types.CREATE_USER_SUCCESS,
    }
}

export const createUserFail = (error) => {
    return{
        type:    types.CREATE_USER_FAIL,
        payload: error
    }
}



// All Users Delete Actions
export const deleteUserStart = (userId) => {
    return{
        type: types.DELETE_USER_START,
        payload:userId
    }
}

export const deleteUserSuccess = (userId) => {
    return{
        type: types.DELETE_USER_SUCCESS,
        payload:userId
    }
}

export const deleteUserFail = (error) => {
    return{
        type: types.DELETE_USER_FAIL,
        payload: error
    }
}


// All Users Delete Actions
export const updateUserStart = ({userInfo}) => {
    return{
        type: types.UPDATE_USER_START,  
        payload:userInfo
    }
}

export const updateUserSuccess = () => {
    return{
        type: types.UPDATE_USER_SUCCESS,
      
    }
}

export const updateUserFail = (error) => {
    return{
        type: types.UPDATE_USER_FAIL,
        payload: error
    }
}