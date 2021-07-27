import _ from 'lodash'
import Ticket from '../modelos/Ticket'

import {
    FINALIZAR_EDICION_TICKET,
    INICIAR_EDICION_TICKET,
    REQUEST_BUSCAR_TICKETS,
    REQUEST_BUSCAR_TICKETS_FAILED,
    REQUEST_BUSCAR_TICKETS_SUCCESS,
    REQUEST_CREATE_TICKET,
    REQUEST_CREATE_TICKET_FAILED,
    REQUEST_CREATE_TICKET_SUCCESS,
    REQUEST_DELETE_TICEKT_FAILED,
    REQUEST_DELETE_TICKET,
    REQUEST_DELETE_TICKET_SUCCESS,
    REQUEST_UPDATE_TICKET,
    REQUEST_UPDATE_TICKET_FAILED,
    REQUEST_UPDATE_TICKET_SUCCESS
} from '../constants/action_types'

const initialState = {
    all: [],
    fecthing: false,
    error: null,
    received_date: null,
    editing: {
        id: -1
    },
    updating: {
        sending: false,
        error: null,
        id: -1
    },
    deleting: {
        sending: false,
        error: null,
        id: -1
    },
    creating: {
        sending: false,
        error: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BUSCAR_TICKETS:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case REQUEST_BUSCAR_TICKETS_SUCCESS:
            return {
                ...state,
                all: action.payload.data.map(ticket => new Ticket(ticket.data)),
                fetching: false,
                received_date: Date.now()
            };
        case REQUEST_BUSCAR_TICKETS_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                }
            };
        case REQUEST_CREATE_TICKET:
            return {
                ...state,
                creating: {
                    ...state.creating,
                    sending: true
                }
            };
        case REQUEST_CREATE_TICKET_SUCCESS:
            return {
                ...state,
                all: [
                    ...state.all,
                    new Ticket(action.payload.data.data)
                ],
                creating: {
                    ...state.creating,
                    sending: false,
                    error: null
                }
            };
        case REQUEST_CREATE_TICKET_FAILED:
            return {
                ...state,
                creating: {
                    sending: false,
                    error: true
                }
            };
        case INICIAR_EDICION_TICKET:
            return {
                ...state,
                editing: {
                    id: action.payload
                }
            };
        case FINALIZAR_EDICION_TICKET:
            return {
                ...state,
                editing: {
                    id: -1
                }
            };
        case REQUEST_UPDATE_TICKET:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    sending: true,
                    id: action.payload
                }
            };
        case REQUEST_UPDATE_TICKET_SUCCESS: {
            const idx = _.findIndex(state.all, ticket => {
                return action.payload.id === ticket.id
            });

            return {
                ...state,
                all: [
                    ...state.all.slice(0, idx),
                    new Ticket(action.payload.response.data.data),
                    ...state.all.slice(idx + 1)
                ],
                updating: {
                    ...state.updating,
                    sending: false,
                    error: null
                }
            };
        }
        case REQUEST_UPDATE_TICKET_FAILED:
            return {
                ...state,
                updating: {
                    ...state.updating,
                    sending: false,
                    error: action.payload.response,
                    id: action.payload.id
                }
            };
        case REQUEST_DELETE_TICKET:
            return {
                ...state,
                deleting: {
                    ...state.deleting,
                    sending: true,
                    id: action.payload.id
                }
            };
        case REQUEST_DELETE_TICKET_SUCCESS: {
            const idx1 = _.findIndex(state.all, ticket => {
                return action.payload.id === ticket.id
            });

            return {
                ...state,
                all: [
                    ...state.all.slice(0, idx1),
                    ...state.all.slice(idx1 + 1)
                ],
                deleting: {
                    ...state.deleting,
                    sending: false
                }
            };
        }
        case REQUEST_DELETE_TICEKT_FAILED:
            return {
                ...state,
                deleting: {
                    ...state.deleting,
                    sending: false,
                    error: action.payload.response,
                    id: action.payload.id
                }
            };
        default:
            return state
    }
}
