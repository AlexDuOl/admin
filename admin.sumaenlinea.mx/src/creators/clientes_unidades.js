import {
    REQUEST_CLIENTES_UNIDADES,
    REQUEST_CLIENTES_UNIDADES_SUCCESS,
    REQUEST_CLIENTES_UNIDADES_FAILED,
} from '../constants/action_types'

export const requestClientesUnidades = (params) => {
    return {
        type: REQUEST_CLIENTES_UNIDADES,
        payload: {params}
    }
}

export const onClientesUnidadesRequestSuccess = (response) => {
    return {
        type: REQUEST_CLIENTES_UNIDADES_SUCCESS,
        payload: response
    }
}

export const onClientesUnidadesRequestFailed = (response) => {
    return {
        type: REQUEST_CLIENTES_UNIDADES_FAILED,
        payload: response
    }
}