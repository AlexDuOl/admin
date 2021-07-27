import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {ENDPOINT_TICKETS} from '../constants/endpoints'
import {
    REQUEST_BUSCAR_TICKETS,
    REQUEST_DELETE_TICKET,
    REQUEST_UPDATE_TICKET,
    REQUEST_CREATE_TICKET
} from '../constants/action_types'

import {
    onRequestBuscarTicketsSuccess,
    onRequestBuscarTicketsFailed,
    onRequestDeleteTicketSuccess,
    onRequestDeleteTicketFailed,
    onRequestUpdateTicketSuccess,
    onRequestUpdateTicketFailed,
    onRequestCreateTicketSuccess,
    onRequestCreateTicketFailed
} from '../creators/tickets'

function* buscarTickets({payload: {params = []}}) {
    try {
        const url = `${ENDPOINT_TICKETS}` + (params.length ? `?${params.join('&')}` : '')

        const response = yield call(axios.get, url)

        yield put(onRequestBuscarTicketsSuccess(response))
    } catch (e) {
        yield put(onRequestBuscarTicketsFailed(e.response))
    }
}

function* crearTicket({payload: {params}}) {
    try {

        const response = yield call(axios.post, ENDPOINT_TICKETS, params)

        yield put(onRequestCreateTicketSuccess(response))
    } catch (e) {
        yield put(onRequestCreateTicketFailed(e.response))
    }
}

function* actualizarTicket({payload: {id, params}}) {
    try {
        const url = `${ENDPOINT_TICKETS}/${id}`

        const response = yield call(axios.put, url, params)

        yield put(onRequestUpdateTicketSuccess(id, response))
    } catch (e) {
        yield put(onRequestUpdateTicketFailed(id, e.response))
    }
}

function* eliminarTicket({payload: {id}}) {
    try {
        const url = `${ENDPOINT_TICKETS}/${id}`

        const response = yield call(axios.delete, url)

        yield put(onRequestDeleteTicketSuccess(id, response))
    } catch (e) {
        yield put(onRequestDeleteTicketFailed(id, e.response))
    }
}

export function* watchRequestFetchTickets() {
    yield takeEvery(REQUEST_BUSCAR_TICKETS, buscarTickets)
}

export function* watchRequestDeleteTicket() {
    yield takeEvery(REQUEST_DELETE_TICKET, eliminarTicket)
}

export function* watchRequestUpdateTicket() {
    yield takeEvery(REQUEST_UPDATE_TICKET, actualizarTicket)
}

export function* watchRequestCreateTicket() {
    yield takeEvery(REQUEST_CREATE_TICKET, crearTicket)
}
