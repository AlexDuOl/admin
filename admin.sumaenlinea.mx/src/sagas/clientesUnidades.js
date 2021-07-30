import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {REQUEST_CLIENTES_UNIDADES} from '../constants/action_types'
import {ENDPOINT_CLIENTES_UNIDADES} from '../constants/endpoints'

import {
    onClientesUnidadesRequestSuccess,
    onClientesUnidadesRequestFailed,
} from '../creators/clientes_unidades'

function* fetchClientesUnidades({payload: {params}}) {
    try {
        const url = `${ENDPOINT_CLIENTES_UNIDADES}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)
        yield put(onClientesUnidadesRequestSuccess(response))
    } catch (e) {
        yield put(onClientesUnidadesRequestFailed(e.response))
    }
}

export function* watchRequestClientesUnidades() {
    yield takeEvery(REQUEST_CLIENTES_UNIDADES, fetchClientesUnidades)
}