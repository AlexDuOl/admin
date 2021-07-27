import {
    REQUEST_INVENTARIO_CELULARES,
    REQUEST_INVENTARIO_CELULARES_SUCCESS,
    REQUEST_INVENTARIO_CELULARES_FAILED,
    REQUEST_UPDATE_EQUIPO_CELULAR,
    REQUEST_UPDATE_EQUIPO_CELULAR_SUCCESS,
    REQUEST_UPDATE_EQUIPO_CELULAR_FAILED,
    REQUEST_CREATE_EQUIPO_CELULAR,
    REQUEST_CREATE_EQUIPO_CELULAR_SUCCESS,
    REQUEST_CREATE_EQUIPO_CELULAR_FAILED,
    START_CREATE_EQUIPO_CELULAR,
    START_UPDATE_EQUIPO_CELULAR,
    END_CREATE_EQUIPO_CELULAR,
    END_UPDATE_EQUIPO_CELULAR,
} from '../constants/action_types'

export const requestInventarioCelulares = (params) => {
    return {
        type: REQUEST_INVENTARIO_CELULARES,
        payload: { params }
    }
}

export const onRequestInventarioCelularesSuccess = (response) => {
    return {
        type: REQUEST_INVENTARIO_CELULARES_SUCCESS,
        payload: response
    }
}

export const onRequestInventarioCelularesFailed = (response) => {
    return {
        type: REQUEST_INVENTARIO_CELULARES_FAILED,
        payload: response
    }
}

export const requestCreateEquipoCelular = (params) => {
    return {
        type: REQUEST_CREATE_EQUIPO_CELULAR,
        payload: { params }
    }
}

export const onRequestCreateEquipoCelularSuccess = (response) => {
    return {
        type: REQUEST_CREATE_EQUIPO_CELULAR_SUCCESS,
        payload: response
    }
}

export const onRequestCreateEquipoCelularFailed = (response) => {
    return {
        type: REQUEST_CREATE_EQUIPO_CELULAR_FAILED,
        payload: response
    }
}

export const startCreateEquipoCelular = () => {
    return {
        type: START_CREATE_EQUIPO_CELULAR,
    }
}

export const endCreateEquipoCelular = () => {
    return {
        type: END_CREATE_EQUIPO_CELULAR,
    }
}

export const startUpdateEquipoCelular = (id) => {
    return {
        type: START_UPDATE_EQUIPO_CELULAR,
        payload: {
            id
        }
    }
}

export const endUpdateEquipoCelular = () => {
    return {
        type: END_UPDATE_EQUIPO_CELULAR,
    }
}

export const requestUpdateEquipoCelular = (id, params) => {
    return {
        type: REQUEST_UPDATE_EQUIPO_CELULAR,
        payload: {
            id,
            params
        }
    }
}

export const onRequestUpdateEquipoCelularSuccess = (id, response) => {
    return {
        type: REQUEST_UPDATE_EQUIPO_CELULAR_SUCCESS,
        payload: {
            id,
            response,
        }
    }
}

export const onRequestUpdateEquipoCelularFailed = (id, response) => {
    return {
        type: REQUEST_UPDATE_EQUIPO_CELULAR_FAILED,
        payload : {
            id,
            response,
        }
    }
}

