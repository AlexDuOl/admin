import EquipoCelular from "../modelos/EquipoCelular";

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
import _ from "lodash";

const initialState = {
    all: [],
    selected: [],
    fetching: false,
    error: null,
    received_date: null,
    creating: {
        sending: false,
        error: null,
        openModal: false,
    },
    updating: {
        sending: false,
        error: null,
        id: -1,
        openModal: false,
    }
};

export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_INVENTARIO_CELULARES:
            return {
                ...state,
                fetching: true,
                error: null
            }
        case REQUEST_INVENTARIO_CELULARES_SUCCESS:
            return {
                ...state,
                fetching: false,
                all: action.payload.data.map(d => new EquipoCelular(d.data)),
                received_date: Date.now()
            }
        case REQUEST_INVENTARIO_CELULARES_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                }
            }
        case REQUEST_CREATE_EQUIPO_CELULAR:
            return {
                ...state,
                creating: {
                    sending: true,
                    error: null
                }
            }
        case REQUEST_CREATE_EQUIPO_CELULAR_SUCCESS:
            return {
                ...state,
                all: [
                    ...state.all,
                    new EquipoCelular(action.payload.data.data)
                ],
                creating: {
                    sending: false,
                    error: null
                }
            }
        case REQUEST_CREATE_EQUIPO_CELULAR_FAILED:
            return {
                ...state,
                creating: {
                    sending: false,
                    error: {
                        cause: action.payload.data
                    }
                }
            }
        case START_CREATE_EQUIPO_CELULAR:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    openModal: true
                }
            }
        case END_CREATE_EQUIPO_CELULAR:
            return {
            ...state,
                creating: {
                ...state.creating,
                    openModal: false
                }
            }
        case START_UPDATE_EQUIPO_CELULAR:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    openModal: true,
                    id: action.payload.id
                }
            }
        case END_UPDATE_EQUIPO_CELULAR:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    openModal: false,
                }
            }
        case REQUEST_UPDATE_EQUIPO_CELULAR:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    sending: true,
                }
            }
        case REQUEST_UPDATE_EQUIPO_CELULAR_SUCCESS: {
            const idx = _.findIndex(state.all, equipoCelular => {
                return action.payload.id === equipoCelular.id
            });

            return {
                ...state,
                all: [
                    ...state.all.slice(0, idx),
                    new EquipoCelular(action.payload.response.data.data),
                    ...state.all.slice(idx + 1)
                ],
                updating: {
                    ...state.updating,
                    sending: false,
                    id: -1,
                    error: null,
                    openModal: false,
                }
            }
        }
        case REQUEST_UPDATE_EQUIPO_CELULAR_FAILED:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    sending: false,
                    error: action.payload.response,
                    id: -1,
                    openModal: false,
                }
            }
        default:
            return state
    }
}
