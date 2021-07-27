import { connect } from 'react-redux'
import {
  requestDeleteTicket,
  requestUpdateTicket,
  iniciarEdicionTicket,
} from '../../creators/tickets'
import ListadoTickets from '../../components/AdministrarTickets/ListadoTickets'

const mapStateToProps = (state) => {
  const { tickets } = state;

  return { tickets }
};

const mapActionsToProps = {
  requestDeleteTicket,
  requestUpdateTicket,
  iniciarEdicionTicket,
};

export default connect(mapStateToProps, mapActionsToProps)(ListadoTickets)
