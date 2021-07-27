import _ from 'lodash'
import Bitacora from '../modelos/Bitacora'

import {
    FINALIZAR_EDICION_BITACORA,
    INICIAR_EDICION_BITACORA,
    REQUEST_BITACORAS,
    REQUEST_BITACORAS_FAILED,
    REQUEST_BITACORAS_SUCCESS,
    REQUEST_DELETE_BITACORA,
    REQUEST_DELETE_BITACORA_FAILED,
    REQUEST_DELETE_BITACORA_SUCCESS,
    REQUEST_UPDATE_BITACORA,
    REQUEST_UPDATE_BITACORA_FAILED,
    REQUEST_UPDATE_BITACORA_SUCCESS
} from '../constants/action_types'

const initialState = {
    all: [],
    fetching: false,
    error: null,
    received_date: null,
    editing: {
        id: -1
    },
    updating: {
        sending: false,
        error: false,
        id: -1
    },
    deleting: {
        sending: false,
        error: null,
        id: -1
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BITACORAS:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case REQUEST_BITACORAS_SUCCESS: {
            return {
                ...state,
                all: action.payload.data.map(d => new Bitacora(d.data)),
                received_date: Date.now(),
                fetching: false
            }
        }
        case REQUEST_BITACORAS_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                }
            };
        case INICIAR_EDICION_BITACORA:
            return {
                ...state,
                editing: {
                    id: action.payload
                }
            };
        case FINALIZAR_EDICION_BITACORA:
            return {
                ...state,
                editing: {
                    id: -1
                }
            };
        case REQUEST_UPDATE_BITACORA:
            return {
                ...state,
                updating: {
                    sending: true,
                    ...action.payload
                }
            };
        case REQUEST_UPDATE_BITACORA_SUCCESS: {
            const indexUpdate = _.findIndex(state.all, bitacora => {
                return bitacora.id === action.payload.id
            });

            return {
                ...state,
                all: [
                    ...state.all.slice(0, indexUpdate),
                    new Bitacora(action.payload.response.data.data),
                    ...state.all.slice(indexUpdate + 1)
                ],
                updating: {
                    ...state.updating,
                    sending: false
                }
            };
        }
        case REQUEST_UPDATE_BITACORA_FAILED:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    sending: false,
                    error: action.payload.response
                }
            };
        case REQUEST_DELETE_BITACORA:
            return {
                ...state,
                deleting: {
                    sending: true,
                    id: action.payload,
                    error: null
                }
            };
        case REQUEST_DELETE_BITACORA_SUCCESS: {
            const indexDelete = _.findIndex(state.all, bitacora => {
                console.log(bitacora.id, action.payload.id);
                return bitacora.id === action.payload.id
            });

            return {
                ...state,
                all: [
                    ...state.all.slice(0, indexDelete),
                    ...state.all.slice(indexDelete + 1)
                ],
                deleting: {
                    ...state.deleting,
                    sending: false
                }
            };
        }
        case REQUEST_DELETE_BITACORA_FAILED:
            return {
                ...state,
                deleting: {
                    ...state.deleting,
                    sending: false,
                    error: action.payload.response
                }
            };
        default:
            return state
    }
}
