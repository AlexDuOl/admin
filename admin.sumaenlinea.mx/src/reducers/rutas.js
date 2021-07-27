import Ruta from '../modelos/Ruta'

import {REQUEST_RUTAS, REQUEST_RUTAS_FAILED, REQUEST_RUTAS_SUCCESS} from '../constants/action_types'

const initialState = {
    all: [],
    selected: [],
    fetching: false,
    error: null,
    received_date: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_RUTAS:
            return {
                ...state,
                fetching: true,
                error: null
            };
        case REQUEST_RUTAS_SUCCESS:
            return {
                ...state,
                fetching: false,
                all: action.payload.data.map(d => new Ruta(d.data)),
                received_date: Date.now()
            };
        case REQUEST_RUTAS_FAILED:
            return {
                ...initialState,
                error: {
                    cause: action.payload
                }
            };
        default:
            return state
    }
}
