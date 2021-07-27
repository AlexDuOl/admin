import React, { Component } from "react";
import {Container} from "semantic-ui-react";
import PropTypes from "prop-types";
import moment from "moment";
import ListadoClientesUnidades from "./ListadoClientesUnidades"

const today = moment().format('YYYY-MM-DD');
class AdministrarClientesUnidades extends Component {
    componentDidMount() {
        this.props.requestClientesUnidades(['fecha=' + today])
    }

    render() {
        
        const {
            clientesUnidades,
        } = this.props


        if(!clientesUnidades){
            console.log("Vacio");
            return (
                <Container fluid style={{padding: "10px"}}>
                    <h2>Vacio</h2>
                </Container>
    
            )
        }else{
            return (
                <Container fluid style={{padding: "10px"}}>
                    <h2>Listado clientes con unidades</h2>
    
                    <ListadoClientesUnidades 
                        clientesUnidades={clientesUnidades}
                    />
                </Container>
    
            )
        }

        
    }
}

AdministrarClientesUnidades.propTypes = {
    //clientesUnidades: PropTypes.object.isRequired,
    //requestClientesUnidades: PropTypes.func.isRequired,
    clientesUnidades: PropTypes.object,
    requestClientesUnidades: PropTypes.func,
}

export default AdministrarClientesUnidades