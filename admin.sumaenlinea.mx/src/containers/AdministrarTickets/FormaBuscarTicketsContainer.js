import { connect } from 'react-redux'
import { requestProveedores } from '../../creators/proveedores'
import { requestOperadores } from '../../creators/operadores'
import { requestBuscarTickets, iniciarEdicionTicket } from '../../creators/tickets'
import FormaBuscarTickets from '../../components/AdministrarTickets/FormaBuscarTickets'

const mapStateToProps = ({ operadores, proveedores, tickets }) => {
  return {
    operadores,
    proveedores,
    tickets
  }
};

const mapActionsToProps = {
  requestBuscarTickets,
  requestOperadores,
  requestProveedores,
  iniciarEdicionTicket
};

export default connect(mapStateToProps, mapActionsToProps)(FormaBuscarTickets)
