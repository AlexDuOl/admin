import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {
    REQUEST_INVENTARIO_CELULARES,
    REQUEST_CREATE_EQUIPO_CELULAR,
    REQUEST_UPDATE_EQUIPO_CELULAR,
} from '../constants/action_types'

import {
    ENDPOINT_CELULARES,
} from '../constants/endpoints'

import {
    onRequestInventarioCelularesSuccess,
    onRequestInventarioCelularesFailed,
    onRequestCreateEquipoCelularSuccess,
    onRequestCreateEquipoCelularFailed,
    onRequestUpdateEquipoCelularSuccess,
    onRequestUpdateEquipoCelularFailed,
} from '../creators/equipos_celulares'


function* fetchInventario({payload: {params}}) {
    try {
        const url = `${ENDPOINT_CELULARES}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)

        yield put(onRequestInventarioCelularesSuccess(response))
    } catch (e) {
        yield put(onRequestInventarioCelularesFailed(e.response))
    }
}

function* createEquipoCelular({payload: {params}}) {
    try {

        const response = yield call(axios.post, ENDPOINT_CELULARES, params)
        yield put(onRequestCreateEquipoCelularSuccess(response))

    } catch (e) {
        yield  put(onRequestCreateEquipoCelularFailed(e.response))
    }
}

function* updateEquipoCelular({payload: {id, params}}) {
    try {
        const url = `${ENDPOINT_CELULARES}/${id}`
        const response = yield call(axios.put, url, params)

        yield put(onRequestUpdateEquipoCelularSuccess(id, response))

    } catch (e) {
        yield put(onRequestUpdateEquipoCelularFailed(id, e.response))
    }
}

export function* watchRequestInventario() {
    yield takeEvery(REQUEST_INVENTARIO_CELULARES, fetchInventario)
}

export function* watchRequestCreateEquipoCelular() {
    yield takeEvery(REQUEST_CREATE_EQUIPO_CELULAR, createEquipoCelular)
}

export function* watchRequestUpdateEquipoCelular() {
    yield takeEvery(REQUEST_UPDATE_EQUIPO_CELULAR, updateEquipoCelular)
}