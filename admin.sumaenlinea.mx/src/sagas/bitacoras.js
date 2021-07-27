import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {
    REQUEST_BITACORAS,
    REQUEST_UPDATE_BITACORA,
    REQUEST_DELETE_BITACORA
} from '../constants/action_types'

import {
    ENDPOINT_BITACORAS
} from '../constants/endpoints'

import {
    onRequestBitacorasSuccess,
    onRequestBitacorasFailed,
    onRequestDeleteBitacoraSuccess,
    onRequestDeleteBitacoraFailed,
    onRequestUpdateBitacoraSuccess,
    onRequestUpdateBitacoraFailed
} from '../creators/bitacoras'

function* fetchBitacoras({payload: {params}}) {
    try {

        const url = `${ENDPOINT_BITACORAS}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)

        yield put(onRequestBitacorasSuccess(response))

    } catch (e) {
        yield put(onRequestBitacorasFailed(e.response))
    }
}

function* deleteBitacora({payload: {id}}) {
    try {
        const url = `${ENDPOINT_BITACORAS}/${id}/cancelar`

        const response = yield call(axios.put, url)

        yield put(onRequestDeleteBitacoraSuccess(id, response))

    } catch (e) {
        yield put(onRequestDeleteBitacoraFailed(id, e.response))
    }
}

function* updateBitacora({payload: {id, params}}) {
    try {
        const url = `${ENDPOINT_BITACORAS}/${id}`

        const response = yield call(axios.put, url, params)

        yield put(onRequestUpdateBitacoraSuccess(id, response))

    } catch (e) {
        yield put(onRequestUpdateBitacoraFailed(id, e.response))
    }
}

export function* watchRequestBitacoras() {
    yield takeEvery(REQUEST_BITACORAS, fetchBitacoras)
}

export function* watchRequestDeleteBitacora() {
    yield takeEvery(REQUEST_DELETE_BITACORA, deleteBitacora)
}


export function* watchRequestUpdateBitacora() {
    yield takeEvery(REQUEST_UPDATE_BITACORA, updateBitacora)
}
