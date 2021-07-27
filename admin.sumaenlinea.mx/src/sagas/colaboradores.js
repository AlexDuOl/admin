import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {REQUEST_COLABORADORES} from '../constants/action_types'
import {ENDPOINT_COLABORADORES} from '../constants/endpoints'

import {
    onColaboradoresRequestSuccess,
    onColaboradoresRequestFailed,
} from '../creators/colaboradores'

function* fetchColaboradores({payload: {params}}) {
    try {
        const url = `${ENDPOINT_COLABORADORES}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)

        yield put(onColaboradoresRequestSuccess(response))
    } catch (e) {
        yield put(onColaboradoresRequestFailed(e.response))
    }
}

export function* watchRequestColaboradores() {
    yield takeEvery(REQUEST_COLABORADORES, fetchColaboradores)
}