import { connect } from 'react-redux'

import {
  getTicketSeleccionado
} from '../../selectors/index'

import {
  requestUpdateTicket,
  finalizarEdicionTicket,
  requestCreateTicket,
} from '../../creators/tickets'

import AdministrarTickets from '../../components/AdministrarTickets/AdministrarTickets'

const mapStateToProps = (state) => {
  const {
    tickets,
    operadores,
    proveedores,
  } = state;

  return {
    tickets,
    operadores,
    proveedores,
    ticketSeleccionado: getTicketSeleccionado(state),
  }
};

const mapActionsToProps = {
  requestUpdateTicket,
  finalizarEdicionTicket,
  requestCreateTicket
};

export default connect(mapStateToProps, mapActionsToProps)(AdministrarTickets)
