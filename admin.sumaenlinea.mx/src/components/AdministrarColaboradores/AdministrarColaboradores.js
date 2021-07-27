import React, { Component } from "react";
import {Container} from "semantic-ui-react";
import ListadoColaboradores from "./ListadoColaboradores";
import PropTypes from "prop-types";
import FormaBuscarColaboradores from "./FormaBuscarColaboradores";
class AdministrarColaboradores extends Component {
    componentDidMount() {
        this.props.requestColaboradores(['activo=true'])
    }

    render() {
        const {
            colaboradores,
            requestColaboradores,
        } = this.props

        return (
            <Container fluid style={{padding: "10px"}}>
                <h2>Listado Colaboradores</h2>

                <FormaBuscarColaboradores
                    colaboradores={colaboradores}
                    onRequestColaboradores={requestColaboradores}
                />

                <ListadoColaboradores colaboradores={colaboradores}/>
            </Container>
        )
    }
}

AdministrarColaboradores.propTypes = {
    colaboradores: PropTypes.object.isRequired,
    requestColaboradores: PropTypes.func.isRequired,
}

export default AdministrarColaboradores