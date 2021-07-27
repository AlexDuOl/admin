import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

import {Segment, Table, Icon, Button, Message} from 'semantic-ui-react'

const ListadoBitacoras = ({bitacoras, onRequestUpdateBitacora, onIniciarEdicionBitacora}) => {

    const agrupadasPorDia = _.groupBy(bitacoras.all, bitacora => {
        return bitacora.tiempoInicial.substr(0, 10)
    });

    const validarKilometraje = function (bitacora, bitacoraAnterior, index) {
        if (index !== 0) {
            if (bitacora.idUnidad === bitacoraAnterior.idUnidad) {
                return (bitacora.kilometrajeInicial === bitacoraAnterior.kilometrajeFinal) ? 'OK' : 'ERROR'
            }
        } else {
            return '-NA-'
        }
    };

    const tablas = _.map(agrupadasPorDia, (dia, index) => {
        return (
            <Segment key={index}>
                <Table celled padded striped key={index} textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={12}>
                                {index}
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Folio</Table.HeaderCell>
                            <Table.HeaderCell>Fecha</Table.HeaderCell>
                            <Table.HeaderCell>Operador</Table.HeaderCell>
                            <Table.HeaderCell>Ruta</Table.HeaderCell>
                            <Table.HeaderCell>Aforo</Table.HeaderCell>
                            <Table.HeaderCell>Unidad</Table.HeaderCell>
                            <Table.HeaderCell>Km Inicial</Table.HeaderCell>
                            <Table.HeaderCell>Km Final</Table.HeaderCell>
                            <Table.HeaderCell>Km Valido</Table.HeaderCell>
                            <Table.HeaderCell>C</Table.HeaderCell>
                            <Table.HeaderCell>T</Table.HeaderCell>
                            <Table.HeaderCell>.</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            dia.map((bitacora, index) => {
                                return (
                                    <Table.Row key={bitacora.id} negative={!bitacora.hasDatosCompletos()}>
                                        <Table.Cell>{bitacora.id}</Table.Cell>
                                        <Table.Cell>{bitacora.folioBitacora}</Table.Cell>
                                        <Table.Cell>{bitacora.getFecha()}</Table.Cell>
                                        <Table.Cell>{bitacora.getOperador().nombre}</Table.Cell>
                                        <Table.Cell><Icon name='circle'
                                                          color={bitacora.getEstructura().color()}/>{bitacora.getNombreRuta()}
                                        </Table.Cell>
                                        <Table.Cell><Icon name='user' color='blue'/>{bitacora.numeroPersonas}
                                        </Table.Cell>
                                        <Table.Cell>{`U${bitacora.getUnidad().id} - ${bitacora.getUnidad().tipo}`}</Table.Cell>
                                        <Table.Cell>{bitacora.kilometrajeInicial}</Table.Cell>
                                        <Table.Cell>{bitacora.kilometrajeFinal}</Table.Cell>
                                        <Table.Cell>{validarKilometraje(bitacora, dia[index - 1], index)}</Table.Cell>
                                        <Table.Cell>
                                            <Icon name={bitacora.confirmado ? 'checkmark' : 'remove'}
                                                  color={bitacora.confirmado ? 'green' : 'red'}/>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Icon name={bitacora.terminado ? 'checkmark' : 'remove'}
                                                  color={bitacora.terminado ? 'green' : 'red'}/>
                                        </Table.Cell>
                                        <Table.Cell textAlign={'center'}>
                                            <Button.Group>
                                                <Button basic icon={bitacora.pagarServicio ? 'money' : 'dollar'}
                                                        color={bitacora.pagarServicio ? 'green' : 'grey'}
                                                        onClick={() => {
                                                            onRequestUpdateBitacora(bitacora.id, {pagar_servicio: !bitacora.pagarServicio})
                                                        }}
                                                        loading={bitacoras.updating.sending && bitacoras.updating.id === bitacora.id}
                                                        disabled={!bitacora.hasDatosCompletos() || bitacora.pagarServicio}
                                                />

                                                <Button basic color={'orange'} icon={'edit'} onClick={() => {
                                                    onIniciarEdicionBitacora(bitacora.id)
                                                }}/>
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
    });

    if (!bitacoras.fetching && !bitacoras.all.length && bitacoras.received_date) {
        return (
            <Message warning>
                <Message.Header>
                    No hubo resultados
                </Message.Header>
                <p>
                    No hay bitácoras con los criterios seleccionados
                </p>
            </Message>
        )
    }

    return (
        <Segment basic loading={bitacoras.fetching}>
            {tablas}
        </Segment>
    )
};

ListadoBitacoras.propTypes = {
    bitacoras: PropTypes.object.isRequired,
    onRequestUpdateBitacora: PropTypes.func.isRequired,
    onIniciarEdicionBitacora: PropTypes.func.isRequired
}

export default ListadoBitacoras
