// 1. 引入store
import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import { loginReducer, logoutReducer } from './LoginReducer'
import createSagaMiddleware from 'redux-saga'
// import loginSaga from '../action/loginSaga'
import rootSaga from '../action/rootSaga'

const sagaMiddlerware = createSagaMiddleware()
//2. 创建store
const store = createStore(combineReducers({user: loginReducer, out: logoutReducer}), applyMiddleware(sagaMiddlerware));

sagaMiddlerware.run(rootSaga)
//4. 导出store
export default store;
