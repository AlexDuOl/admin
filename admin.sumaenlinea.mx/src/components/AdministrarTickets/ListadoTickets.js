import React, { Component } from 'react'
import { Segment, Table, Message, Button, Icon } from 'semantic-ui-react'
import { table_header } from '../../helpers/index'
import { roundToTwoDecimals } from '../../helpers'
import PropTypes from "prop-types";

const header_titles = [
  'Id',
  'Operador',
  'Gasolinera',
  'Unidad',
  'Kilometraje',
  'Folio',
  'Fecha',
  'Combustible',
  'Litros',
  'Precio',
  'Monto',
  'Partida',
  'Vía captura',
  'Controles'
];

class ListadoTickets extends Component {

  render () {
    const { tickets, requestUpdateTicket, iniciarEdicionTicket } = this.props;
  //requestDeleteTicket,
    if (!tickets.fetching && !tickets.received_date)
      return (<Message warning header='Nada para mostrar' content='No se ha hecho ninguna búsqueda'/>);

    if (!tickets.fetching && !tickets.all.length && !tickets.error)
      return (<Message header='No hubo resultados' content='La búsqueda no produjo ningún resultado' />);

    if (tickets.error)
      return (<Message header='Ooops, ocurrió un error' content={tickets.error.cause} />);

    return (
      <Segment loading={tickets.fetching}>
        <Table celled padded striped>

          { table_header(header_titles) }

          <Table.Body>
            {
              tickets.all.map(ticket => {

                return (
                  <Table.Row key={ticket.id} positive={ ticket.verificado }>
                    <Table.Cell>{ ticket.id }</Table.Cell>
                    <Table.Cell>{ ticket.getOperador().nombre }</Table.Cell>
                    <Table.Cell>{ ticket.getGasolinera().nombre }</Table.Cell>
                    <Table.Cell>{ ticket.getUnidad().numeroEconomico }</Table.Cell>
                    <Table.Cell>{ ticket.kilometraje }</Table.Cell>
                    <Table.Cell>{ ticket.folio }</Table.Cell>
                    <Table.Cell>{ ticket.fecha }</Table.Cell>
                    <Table.Cell>{ ticket.tipoCombustible }</Table.Cell>
                    <Table.Cell>{ roundToTwoDecimals(ticket.litros) }</Table.Cell>
                    <Table.Cell>{ roundToTwoDecimals(ticket.precioCombustible) }</Table.Cell>
                    <Table.Cell>{ roundToTwoDecimals(ticket.monto) }</Table.Cell>
                    <Table.Cell>{ ticket.idPartida }</Table.Cell>

                    <Table.Cell>
                      <Icon name={ticket.viaCaptura ? 'desktop' : 'checkmark'}
                            color={ticket.viaCaptura ? 'blue' : 'green'} />
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group widths={3}>
                        <Button basic compact color={'orange'} icon={'edit'}
                                loading={ tickets.updating.id === ticket.id && tickets.updating.sending }
                                onClick={() => { iniciarEdicionTicket(ticket.id) }} />

                        <Button basic compact color={'grey'} icon={ticket.verificado ? 'check' : 'remove' }
                                loading={ tickets.updating.id === ticket.id && tickets.updating.sending }
                                onClick={() => requestUpdateTicket( ticket.id, { verificado: !ticket.verificado } )} />
                        {/*
                        { !ticket.verificado && !ticket.idPartida &&
                        <Button basic compact color={'grey'} icon={'trash'}
                                loading={tickets.deleting.id === ticket.id && tickets.deleting.sending}
                                onDoubleClick={() => { requestDeleteTicket(ticket.id) }} />
                        }
                        */}
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

ListadoTickets.propTypes = {
  tickets: PropTypes.object.isRequired,
  requestUpdateTicket: PropTypes.func.isRequired,
  requestDeleteTicket: PropTypes.func.isRequired,
  iniciarEdicionTicket: PropTypes.func.isRequired
}

export default ListadoTickets
