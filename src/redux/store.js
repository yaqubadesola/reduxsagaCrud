import { applyMiddleware, createStore } from "redux";
import rootReducer from './rootReducer'
import createSagaMiddleware from "redux-saga"; //saga Async Call
import logger from "redux-logger"; //Logger Call
import rootSaga from './usersaga';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger) // pushing logger middleware for production ready application
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export default store;