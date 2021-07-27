import Proveedor from '../modelos/Proveedor'

import {
  REQUEST_PROVEEDORES,
  REQUEST_PROVEEDORES_SUCCESS,
  REQUEST_PROVEEDORES_FAILED
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
    case REQUEST_PROVEEDORES:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case REQUEST_PROVEEDORES_SUCCESS:
      return {
        ...state,
        fetching: false,
        all: action.payload.data.map(d => new Proveedor(d.data)),
        received_date: Date.now()
      };
    case REQUEST_PROVEEDORES_FAILED:
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
