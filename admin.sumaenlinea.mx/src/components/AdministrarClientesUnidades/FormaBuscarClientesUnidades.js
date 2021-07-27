import React, {Component} from 'react'
import {Form, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import _ from 'lodash';
import moment from "moment";
class FormaBuscarClientesUnidades extends Component {

    constructor(props) {
        super(props);

        this.initialValues = {
            desde: moment().day(3 - 7).format('YYYY-MM-DD' + '%' + 'hh:mm:ss'),
            hasta: moment().day(2).format('YYYY-MM-DD' + '%' + 'hh:mm:ss'),
            fecha: "",
        }

        this.state = {
            ...this.initialValues
        }
    }

/*
    onChangeValue = (event, data) => {
        if (data) {
            this.setState({[data.name]: data.value})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    onSubmit = () => {

        const params = [
            'activo=true'
        ]

        if (this.state.id_unidad) {
            params.push(`id=${this.state.id_unidad}`)
        }

        if (this.state.nombre_empresa) {
            params.push(`id=${this.state.nombre_empresa}`)
        }

        if (this.state.id_ruta) {
            params.push(`id=${this.state.id_ruta}`)
        }

        this.props.onRequestClientesUnidades(params)
    }

    onReset = () => {
        this.setState({
            ...this.initialValues
        })
    }
    */
    render() {
        console.log(this.props);
        const id_unidad = this.props.clientesUnidades.all.map(clienteUnidad => {
            return clienteUnidad.id_unidad
        })

        const opcionesIdUnidad = _.uniq(id_unidad).map((id, idx) => {
            return {
                key: idx,
                text: id,
                value: id
            }
        })

        const id_ruta = this.props.clientesUnidades.all.map(clienteUnidad => {
            return clienteUnidad.id_ruta
        })

        const opcionesIdRuta = _.uniq(id_ruta).map((id, idx) => {
            return {
                key: idx,
                text: id,
                value: id
            }
        })

        const nombreStrings = this.props.clientesUnidades.all.map(clienteUnidad => {
            return clienteUnidad.nombre_empresa
        })

        const opcionesNombre = _.uniq(nombreStrings).map((nombre, idx) => {
            return {
                key: idx,
                text: nombre,
                value: nombre
            }
        })

        return (
            <Segment color='orange'>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid
                            label={'ID Unidad'}
                            name={'id_unidad'}
                            options={opcionesIdUnidad}
                            placeholder='ID Unidad'
                            value={this.state.id_unidad}
                            onChange={this.onChangeValue}
                        />
                        <Form.Select
                            fluid
                            label={'ID Ruta'}
                            name={'id_ruta'}
                            options={opcionesIdRuta}
                            placeholder='ID Ruta'
                            value={this.state.id_ruta}
                            onChange={this.onChangeValue}
                        />
                        <Form.Select
                            fluid
                            label={'Nombre Cliente'}
                            name={'nombre_empresa'}
                            options={opcionesNombre}
                            placeholder='Nombre de cliente'
                            value={this.state.nombre_empresa}
                            onChange={this.onChangeValue}
                        />
                    </Form.Group>

                    <Form.Group inline>
                        <Form.Field>
                            <Form.Button color='orange' loading={this.props.clientesUnidades.fetching}>Buscar</Form.Button>
                        </Form.Field>
                        <Form.Field>
                            <Form.Button onClick={this.onReset}>Limpiar</Form.Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }

}

FormaBuscarClientesUnidades.propTypes = {
    clientesUnidades: PropTypes.object.isRequired,
    onRequestClientesUnidades: PropTypes.func
}

export default FormaBuscarClientesUnidades