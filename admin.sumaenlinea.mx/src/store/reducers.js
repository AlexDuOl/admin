import { combineReducers } from 'redux'
import bitacoras from '../reducers/bitacoras'
import proveedores from "../reducers/proveedores"
import clientes from "../reducers/clientes"
import estructuras from "../reducers/estructuras"
import rutas from "../reducers/rutas"
import operadores from "../reducers/operadores"
import tickets from "../reducers/tickets"
import equiposCelulares from "../reducers/equipos_celulares"
import colaboradores from "../reducers/colaboradores";
import clientesUnidades from '../reducers/clientes_unidades'

const makeRootReducer = () => {
  return combineReducers({
    bitacoras,
    proveedores,
    clientes,
    estructuras,
    rutas,
    operadores,
    tickets,
    equiposCelulares,
    colaboradores,
    clientesUnidades,
  })
}

export default makeRootReducer
