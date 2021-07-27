import {all} from 'redux-saga/effects'
import {watchFetchClientes} from './clientes'
import {watchRequesFetchRutas} from './rutas'
import {watchEstructurasRequest} from './estructuras'
import {watchRequestProveerdores} from './proveedores'
import {watchRequestOperadores} from './operadores'
import {watchRequestBitacoras, watchRequestDeleteBitacora, watchRequestUpdateBitacora} from './bitacoras'
import {
    watchRequestCreateTicket,
    watchRequestDeleteTicket,
    watchRequestFetchTickets,
    watchRequestUpdateTicket
} from './tickets'
import {
    watchRequestInventario,
    watchRequestCreateEquipoCelular,
    watchRequestUpdateEquipoCelular
} from './inventario'
import {watchRequestColaboradores} from "./colaboradores";
import {watchRequestClientesUnidades} from "./clientesUnidades";

export default function* rootSaga() {
    yield all([
        watchFetchClientes(),
        watchRequesFetchRutas(),
        watchEstructurasRequest(),
        watchRequestProveerdores(),
        watchRequestOperadores(),
        watchRequestBitacoras(),
        watchRequestDeleteBitacora(),
        watchRequestUpdateBitacora(),
        watchRequestFetchTickets(),
        watchRequestDeleteTicket(),
        watchRequestUpdateTicket(),
        watchRequestCreateTicket(),
        watchRequestInventario(),
        watchRequestCreateEquipoCelular(),
        watchRequestUpdateEquipoCelular(),
        watchRequestColaboradores(),
        watchRequestClientesUnidades(),
    ])
}
