import Operador from '../modelos/Operador'

import {
    REQUEST_COLABORADORES,
    REQUEST_COLABORADORES_SUCCESS,
    REQUEST_COLABORADORES_FAILED,
} from '../constants/action_types'

const initialState = {
    all: [],
    selected: [],
    fetching: false,
    error: null,
    received_date: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_COLABORADORES:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case REQUEST_COLABORADORES_SUCCESS:
            return {
                ...state,
                fetching: false,
                all: action.payload.data.map(d => new Operador(d.data)),
                received_date: Date.now()
            };
        case REQUEST_COLABORADORES_FAILED:
            return {
                ...initialState,
                fetching: false,
                error: {
                    cause: action.payload
                }
            };
        default:
            return state
    }
}