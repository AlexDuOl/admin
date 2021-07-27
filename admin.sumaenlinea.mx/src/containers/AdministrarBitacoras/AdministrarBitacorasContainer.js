import { connect } from 'react-redux'
import { requestClientes } from '../../creators/clientes'
import { requestProveedores } from '../../creators/proveedores'
import { requestOperadores } from '../../creators/operadores'
import {
  iniciarEdicionBitacora,
  requestDeleteBitacora,
  requestUpdateBitacora
} from '../../creators/bitacoras'

import AdministrarBitacoras from '../../components/AdministrarBitacoras/AdministrarBitacoras'

import { getBitacoraSeleccionada } from '../../selectors'

const mapStateToProps = (state) => {
  const { bitacoras } = state;
  return {
    bitacoras,
    bitacoraSeleccionada: getBitacoraSeleccionada(state)
  }
};

const mapActionsToProps = {
  requestClientes,
  requestProveedores,
  requestOperadores,
  iniciarEdicionBitacora,
  requestUpdateBitacora,
  requestDeleteBitacora
};

export default connect(mapStateToProps, mapActionsToProps)(AdministrarBitacoras)
