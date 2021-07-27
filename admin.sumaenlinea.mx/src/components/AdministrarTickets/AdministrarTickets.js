import React, { Component } from 'react'
import { Container, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import FormaBuscarTickets from '../../containers/AdministrarTickets/FormaBuscarTicketsContainer'
import FormaEditarTicket from './FormaEditarTicket'
import ListadoTickets from '../../containers/AdministrarTickets/ListadoTicketsContainer'
import EstadisticasTickets from './EstadisticasTickets'

class AdministrarTickets extends Component {
  render () {

    const {
      tickets,
      operadores,
      proveedores,
      ticketSeleccionado,
      requestUpdateTicket,
      finalizarEdicionTicket,
      requestCreateTicket,
    } = this.props

    return (
      <Container fluid style={{padding: "10px"}}>
        <h2>Tickets</h2>
        <FormaBuscarTickets />

        <EstadisticasTickets tickets={ tickets } />

        <ListadoTickets />

        {
          (tickets.editing.id === -2 || tickets.editing.id !== -1) &&
          <Modal open={(tickets.editing.id !== -1)} size={'large'}>
            <Modal.Header>Editar ticket ID: {tickets.editing.id}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <FormaEditarTicket
                  operadores={operadores}
                  proveedores={proveedores}
                  ticket={ticketSeleccionado}
                  onRequestUpdateTicket={requestUpdateTicket}
                  onFinalizarEdicionTicket={finalizarEdicionTicket}
                  onRequestCreateTicket={requestCreateTicket} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        }
      </Container>
    )
  }
}

AdministrarTickets.propTypes = {
  tickets: PropTypes.object.isRequired,
  operadores: PropTypes.object.isRequired,
  proveedores: PropTypes.object.isRequired,
  ticketSeleccionado: PropTypes.object,
  requestUpdateTicket: PropTypes.func.isRequired,
  finalizarEdicionTicket: PropTypes.func.isRequired,
  requestCreateTicket: PropTypes.func.isRequired
}

export default AdministrarTickets
