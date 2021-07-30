import React, {Component} from "react"
import {Segment} from 'semantic-ui-react'
import PropTypes from "prop-types";

class ListadoClientesUnidades extends Component {
    render() {
        const {
            clientesUnidades,
        } = this.props;
console.log(clientesUnidades);
        return(
            <Segment>
                {/*                
                <Table celled padded striped textAlign='center'>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell>Fecha</Table.HeaderCell>
                            <Table.HeaderCell>Id Unidad</Table.HeaderCell>
                            <Table.HeaderCell>Id Ruta</Table.HeaderCell>
                            <Table.HeaderCell>Ruta</Table.HeaderCell>
                            <Table.HeaderCell>Id Cliente</Table.HeaderCell>
                            <Table.HeaderCell>Nombre Empresa</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {clientesUnidades.all.map(clienteUnidad =>
                            <Table.Row key={clienteUnidad.id}>
                                <Table.Cell singleLine> {clienteUnidad.fecha} </Table.Cell>
                                <Table.Cell> {clienteUnidad.id_unidad} </Table.Cell>
                                <Table.Cell> {clienteUnidad.id_ruta} </Table.Cell>
                                <Table.Cell> {clienteUnidad.ruta} </Table.Cell>
                                <Table.Cell> {clienteUnidad.id_cliente} </Table.Cell>
                                <Table.Cell> {clienteUnidad.nombre_empresa} </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
*/}
            </Segment>
        )
    }

}

ListadoClientesUnidades.propTypes = {
    //clientesUnidades: PropTypes.object.isRequired,
    clientesUnidades: PropTypes.object,
}

export default ListadoClientesUnidades