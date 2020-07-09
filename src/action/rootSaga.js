import { all } from 'redux-saga/effects'

import loginSaga from './loginSaga'
import logoutSaga from './loginOutSaga'

export default function* rootSaga() {
    yield all ([logoutSaga(), loginSaga()])
}