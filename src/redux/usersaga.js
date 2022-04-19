import {
    take, 
    takeEvery, 
    takeLatest, 
    call, 
    put, 
    all, 
    delay, 
    fork
} 
from 'redux-saga/effects'
import * as types from './actiontypes';
import { loadUsersSuccess, 
         loadUsersFail, 
         createUserSuccess, 
         createUserFail, 
         deleteUserSuccess, 
         deleteUserFail,
         updateUserSuccess,
         updateUserFail
        } from './actions'
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from './api'

//This generator does the async loading
function* onLoadUsersStartAsync(){
    try{
        const response = yield call(loadUsersApi)
        console.log("Response data ",response);
        if(response.status === 200){
            yield delay(500);
            yield put(loadUsersSuccess(response.data))
        }
    }
    catch(error){
        yield put(loadUsersFail(error))
    } 
}




//This generator does the async creation of new user
function* onCreateUserStartAsync({payload}){
    try{
        const response = yield call(createUserApi, payload)
        console.log("Response create data ",response);
        if(response.status === 200){
            yield put(createUserSuccess())
        }
    }
    catch(error){
        yield put(createUserFail(error))
    } 
}


//This generator does the async update of user
function* onUpdateUserStartAsync({payload}){
    try{
        console.log("id ", payload.id, "userinfo ", payload.formValue )
        const response = yield call(updateUserApi, payload.id, payload.formValue)
        console.log("Response update data ",response);
        if(response.status === 200){
            yield put(updateUserSuccess())
        }
    }
    catch(error){
        yield put(updateUserFail(error.response.data))
    } 
}

//This generator does the async deletion of existing user
function* onDeleteUserStartAsync(userId){
    try{
        const response = yield call(deleteUserApi, userId)
        console.log("Response delete data ",response);
        if(response.status === 200){
            yield delay(500);
            yield put(deleteUserSuccess(userId))
        }
    }
    catch(error){
        yield put(deleteUserFail(error))
    } 
}



//This generator does the Load async watcher
function*  onLoadUsers(){
    yield takeEvery(types.LOAD_USER_START, onLoadUsersStartAsync)
}


//This generator does the create async watcher
function*  onCreateUser(){
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync)
}

//This generator does the update async watcher
function*  onUpdateUser(){
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync)
}


//This generator does the delete async watcher
function*  onDeleteUser(){
    while(true){
        const {payload:userId} =  yield take(types.DELETE_USER_START);
        console.log("payload userID ",userId)
        yield call(onDeleteUserStartAsync, userId)
       
    }
    
}
//This fork a concurrent saga watcher
const usersaga = [
    fork(onLoadUsers),
    fork(onCreateUser),
    fork(onDeleteUser),
    fork(onUpdateUser)
]

export default function* rootSaga(){
    yield all([...usersaga])
} 