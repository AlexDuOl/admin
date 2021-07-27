import {
  REQUEST_BITACORAS,
  REQUEST_BITACORAS_SUCCESS,
  REQUEST_BITACORAS_FAILED,
  REQUEST_DELETE_BITACORA,
  REQUEST_DELETE_BITACORA_SUCCESS,
  REQUEST_DELETE_BITACORA_FAILED,
  REQUEST_UPDATE_BITACORA,
  REQUEST_UPDATE_BITACORA_SUCCESS,
  REQUEST_UPDATE_BITACORA_FAILED,
  INICIAR_EDICION_BITACORA,
  FINALIZAR_EDICION_BITACORA
} from '../constants/action_types'

export const requestBitacoras = (params) => ({
  type: REQUEST_BITACORAS,
  payload: { params }
})

export const onRequestBitacorasSuccess = (response) => ({
  type: REQUEST_BITACORAS_SUCCESS,
  payload: response
})

export const onRequestBitacorasFailed = (response) => ({
  type: REQUEST_BITACORAS_FAILED,
  payload: response
})

export const requestDeleteBitacora = (id) => ({
  type: REQUEST_DELETE_BITACORA,
  payload: { id }
})

export const onRequestDeleteBitacoraSuccess = (id, response) => ({
  type: REQUEST_DELETE_BITACORA_SUCCESS,
  payload: {
    id,
    response
  }
})

export const onRequestDeleteBitacoraFailed = (id, response) => ({
  type: REQUEST_DELETE_BITACORA_FAILED,
  payload: {
    id,
    response
  }
})

export const requestUpdateBitacora = (id, params) => ({
  type: REQUEST_UPDATE_BITACORA,
  payload: {
    id,
    params
  }
})

export const onRequestUpdateBitacoraSuccess = (id, response) => ({
  type: REQUEST_UPDATE_BITACORA_SUCCESS,
  payload: {
    id,
    response
  }
})

export const onRequestUpdateBitacoraFailed = (id, response) => ({
  type: REQUEST_UPDATE_BITACORA_FAILED,
  payload: {
    id,
    response
  }
})


export const iniciarEdicionBitacora =  (id) => {
  return {
    type: INICIAR_EDICION_BITACORA,
    payload: id
  }
}


export const finalizarEdicionBitacora = () => {
  return {
    type: FINALIZAR_EDICION_BITACORA
  }
}
