import React, {Component} from 'react'
import {Container, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import FormaBuscarBitacoras from '../../containers/AdministrarBitacoras/FormaBuscarBitacorasContainer'
import FormaEditarBitacora from '../../containers/AdministrarBitacoras/FormaEditarBitacoraContainer'
import ListadoBitacoras from './ListadoBitacoras'

class AdministrarBitacoras extends Component {

    componentDidMount() {
        this.props.requestClientes({
            params: ['activo=true', 'id_categoria=1', 'or(id=5)', 'sort(+nombre_empresa)']
        });

        this.props.requestProveedores({
            params: ['activo=true', 'id_categoria=8', 'or(id=1)', 'sort(+empresa)']
        });

        this.props.requestOperadores({
            params: ['activo=true', 'sort(+nombre)']
        })
    }

    render() {

        const {bitacoras, bitacoraSeleccionada, iniciarEdicionBitacora, requestUpdateBitacora} = this.props;

        return (
                <Container fluid style={{padding: "10px"}}>
                    <h2>Bitacoras</h2>

                    <FormaBuscarBitacoras />

                    <ListadoBitacoras bitacoras={bitacoras}
                                      onIniciarEdicionBitacora={iniciarEdicionBitacora}
                                      onRequestUpdateBitacora={requestUpdateBitacora} />

                    {
                        (bitacoraSeleccionada) &&
                        <Modal open={true} size='large'>
                            <Modal.Header>{bitacoraSeleccionada.id} - {bitacoraSeleccionada.getNombreRuta()}</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <FormaEditarBitacora/>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    }
                </Container>
        )
    }
}

AdministrarBitacoras.propTypes = {
    requestClientes: PropTypes.func.isRequired,
    bitacoraSeleccionada: PropTypes.object, //.isRequired,
    requestProveedores: PropTypes.func.isRequired,
    requestOperadores: PropTypes.func.isRequired,
    bitacoras: PropTypes.object.isRequired,
    iniciarEdicionBitacora: PropTypes.func.isRequired,
    requestUpdateBitacora: PropTypes.func.isRequired
}

export default AdministrarBitacoras
