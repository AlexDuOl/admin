import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Modal} from "semantic-ui-react";
import ListadoCelulares from "./ListadoCelulares";
import FormaBuscarEquiposCelulares from "./FomaBuscarEquiposCelulares";
import FormaEditarEquiposCelulares from "./FormaEditarEquiposCelulares";

class AdministrarEquiposCelulares extends Component {
    componentDidMount() {
        //this.props.requestInventarioCelulares(['activo=true'])
        this.props.requestInventarioCelulares(['id=ge=1'])
    }

    render() {
        const {
            equiposCelulares,
            requestInventarioCelulares,
            requestCreateEquipoCelular,
            requestUpdateEquipoCelular,
            startCreateEquipoCelular,
            startUpdateEquipoCelular,
            endCreateEquipoCelular,
            endUpdateEquipoCelular,
            equipoCelularSeleccionado
        } = this.props;

        const {  creating, updating } = equiposCelulares
        const openModal = (creating.openModal || updating.openModal)
        const sending = (creating.sending || updating.sending)

        return (
            <Container fluid style={{padding: "10px"}}>
                <h2>Inventario celulares</h2>
                <FormaBuscarEquiposCelulares
                    celulares={equiposCelulares}
                    onRequestCelulares={requestInventarioCelulares}
                    startCreateEquiposCelulares={startCreateEquipoCelular}
                />

                <ListadoCelulares
                    equiposCelulares={equiposCelulares}
                    startUpdateEquipoCelular={startUpdateEquipoCelular}
                />

                {
                    (openModal) &&
                    <Modal size={'large'} open={openModal}>
                        {
                            (creating.openModal) &&
                            <Modal.Header>Agregar Equipo Celular</Modal.Header>
                        }

                        {
                            (updating.openModal) &&
                            <Modal.Header>Editar Equipo Celular</Modal.Header>
                        }

                        <Modal.Content>
                            <Modal.Description>
                                <FormaEditarEquiposCelulares
                                    onPostEquipoCelular={requestCreateEquipoCelular}
                                    endCreateEquipoCelular={endCreateEquipoCelular}
                                    equipoCelularSeleccionado={equipoCelularSeleccionado}
                                    endUpdateEquipoCelular={endUpdateEquipoCelular}
                                    onPutEquipoCelular={requestUpdateEquipoCelular}
                                    sending={sending}
                                    error={creating.error}/>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                }
            </Container>
        )
    }
}

AdministrarEquiposCelulares.propTypes = {
    equiposCelulares: PropTypes.object.isRequired,
    requestInventarioCelulares: PropTypes.func.isRequired,
    requestCreateEquipoCelular: PropTypes.func.isRequired,
    requestUpdateEquipoCelular: PropTypes.func.isRequired,
    startCreateEquipoCelular: PropTypes.func.isRequired,
    startUpdateEquipoCelular: PropTypes.func.isRequired,
    endCreateEquipoCelular: PropTypes.func.isRequired,
    endUpdateEquipoCelular: PropTypes.func.isRequired,
    equipoCelularSeleccionado: PropTypes.object
}

export default AdministrarEquiposCelulares