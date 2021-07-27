import ClientesUnidades from '../modelos/ClientesUnidades'

import {
    REQUEST_CLIENTES_UNIDADES,
    REQUEST_CLIENTES_UNIDADES_SUCCESS,
    REQUEST_CLIENTES_UNIDADES_FAILED,
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
        case REQUEST_CLIENTES_UNIDADES:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case REQUEST_CLIENTES_UNIDADES_SUCCESS:
            return {
                ...state,
                fetching: false,
                all: action.payload.data.map(d => new ClientesUnidades(d.data)),
                received_date: Date.now()
            };
        case REQUEST_CLIENTES_UNIDADES_FAILED:
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
