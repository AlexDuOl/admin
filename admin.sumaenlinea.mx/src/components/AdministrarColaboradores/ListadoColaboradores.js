import React, {Component} from "react"
import {Segment, Table} from 'semantic-ui-react'
import PropTypes from "prop-types";

class ListadoColaboradores extends Component {

    render() {
        const {
            colaboradores
        } = this.props;

        return(
            <Segment>
                <Table celled padded striped textAlign='center'>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Nombre</Table.HeaderCell>
                            <Table.HeaderCell>Correo</Table.HeaderCell>
                            <Table.HeaderCell>Teléfono</Table.HeaderCell>
                            <Table.HeaderCell>Días de antigüedad</Table.HeaderCell>
                            <Table.HeaderCell>Tiempo de ingreso</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {colaboradores.all.map(colaborador =>
                            <Table.Row key={colaborador.id}>
                                <Table.Cell singleLine> {colaborador.id} </Table.Cell>
                                <Table.Cell> {colaborador.nombre} </Table.Cell>
                                <Table.Cell> {colaborador.email} </Table.Cell>
                                <Table.Cell> {colaborador.numeroTelefono} </Table.Cell>
                                <Table.Cell> {colaborador.antiguedad.dias} </Table.Cell>
                                <Table.Cell> {colaborador.antiguedad.formatted} </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }

}

ListadoColaboradores.propTypes = {
    colaboradores: PropTypes.object.isRequired,
}

export default ListadoColaboradores