import React, {Component} from "react"
import PropTypes from "prop-types";
import {Table, Button, Segment} from 'semantic-ui-react'

const EstatusActivo = ({activo}) => {
    return (
        activo === true?
        <Table.Cell textAlign='center'>
            Activo
        </Table.Cell> :
        <Table.Cell textAlign='center'>
            Inactivo
        </Table.Cell>
    )
}

EstatusActivo.propTypes = {
    activo: PropTypes.bool
}

class ListadoCelulares extends Component {

    render() {
        const {equiposCelulares, startUpdateEquipoCelular} = this.props;

        return (
            <Segment>
                <Table celled padded striped textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Marca</Table.HeaderCell>
                            <Table.HeaderCell>Modelo</Table.HeaderCell>
                            <Table.HeaderCell>Condiciones del equipo</Table.HeaderCell>
                            {/*<Table.HeaderCell>Número</Table.HeaderCell>*/}
                            <Table.HeaderCell>IMEI</Table.HeaderCell>
                            <Table.HeaderCell>Estatus</Table.HeaderCell>
                            {/*<Table.HeaderCell>Estatus Línea</Table.HeaderCell>*/}
                            <Table.HeaderCell>Notas</Table.HeaderCell>
                            <Table.HeaderCell>Editar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {equiposCelulares.all.map(celular =>
                            <Table.Row key={celular.id}>
                                <Table.Cell singleLine> {celular.marca} </Table.Cell>
                                <Table.Cell> {celular.modelo} </Table.Cell>
                                <Table.Cell> {celular.estatus} </Table.Cell>
                                {/*<Table.Cell> {celular.getLineaCelular().numero} </Table.Cell>*/}
                                <Table.Cell> {celular.imei} </Table.Cell>
                                <EstatusActivo activo={celular.activo}/>
                                {/*<EstatusActivo estatus={celular.getLineaCelular().activa}/>*/}
                                <Table.Cell> {celular.notas} </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        basic color={'orange'}
                                        icon={'edit'}
                                        onClick={() => {
                                            startUpdateEquipoCelular(celular.id)
                                        }}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Segment>
        )
    }

}

ListadoCelulares.propTypes = {
    equiposCelulares: PropTypes.object.isRequired,
    startUpdateEquipoCelular: PropTypes.func
}

export default ListadoCelulares