import { connect } from 'react-redux'
import { requestBitacoras } from '../../creators/bitacoras'
import { invalidarRutas, requestRutas } from '../../creators/rutas'
import { invalidarEstructuras, requestEstructuras } from '../../creators/estructuras'

import FormaBuscarBitacoras from '../../components/AdministrarBitacoras/FormaBuscarBitacoras'

const mapStateToProps = ({ clientes, rutas, estructuras, proveedores, operadores, bitacoras}) => {
  return {
    clientes,
    rutas,
    estructuras,
    proveedores,
    operadores,
    bitacoras
  }
};

const mapActionsToProps = {
  invalidarRutas,
  invalidarEstructuras,
  requestRutas,
  requestEstructuras,
  requestBitacoras
};

export default connect(mapStateToProps, mapActionsToProps)(FormaBuscarBitacoras)
