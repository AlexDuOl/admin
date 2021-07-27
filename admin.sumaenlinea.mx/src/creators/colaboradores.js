import {
    REQUEST_COLABORADORES,
    REQUEST_COLABORADORES_SUCCESS,
    REQUEST_COLABORADORES_FAILED,
} from '../constants/action_types'

export const requestColaboradores = (params) => {
    return {
        type: REQUEST_COLABORADORES,
        payload: {params}
    }
}

export const onColaboradoresRequestSuccess = (response) => {
    return {
        type: REQUEST_COLABORADORES_SUCCESS,
        payload: response
    }
}

export const onColaboradoresRequestFailed = (response) => {
    return {
        type: REQUEST_COLABORADORES_FAILED,
        payload: response
    }
}