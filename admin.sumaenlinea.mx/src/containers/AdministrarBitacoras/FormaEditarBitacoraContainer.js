import { connect } from 'react-redux'

import FormaEditarBitacora from '../../components/AdministrarBitacoras/FormaEditarBitacora'

import { getBitacoraSeleccionada } from '../../selectors'

import {
  requestUpdateBitacora,
  finalizarEdicionBitacora
} from '../../creators/bitacoras'

const mapStateToProps = (state) => {
  return {
    bitacoraSeleccionada: getBitacoraSeleccionada(state)
  }
};

const mapActionsToProps = {
  requestUpdateBitacora,
  finalizarEdicionBitacora
};

export default connect(mapStateToProps, mapActionsToProps)(FormaEditarBitacora)
