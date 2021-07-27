import React, {Component} from 'react'
import {Form, Segment} from "semantic-ui-react";
import PropTypes from "prop-types";
import _ from 'lodash'

class FormaBuscarColaboradores extends Component {

    constructor(props) {
        super(props);

        this.initialValues = {
            id: '',
            nombre: '',
            email: '',
            numeroTelefono: '',
            dias: 0,
            formatted: '',
        }

        this.state = {
            ...this.initialValues
        }
    }

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

        if (this.state.id) {
            params.push(`id=${this.state.id}`)
        }

        if (this.state.nombre) {
            params.push(`nombre=${this.state.nombre}`)
        }

        if (this.state.email) {
            params.push(`email=${this.state.email}`)
        }

        /*if(this.state.numeroTelefono) {
            params.push(`numero_telefono=${this.state.numeroTelefono}`)
        }*/

        if (this.state.dias) {
            params.push(`dias=${this.state.dias}`)
        }

        if (this.state.formatted) {
            params.push(`formatted=${this.state.formatted}`)
        }

        this.props.onRequestColaboradores(params)
    }

    onReset = () => {
        this.setState({
            ...this.initialValues
        })
    }

    render() {
        const idValue = this.props.colaboradores.all.map(colaborador => {
            return colaborador.id
        })

        const opcionesId = _.uniq(idValue).map((id, idx) => {
            return {
                key: idx,
                text: id,
                value: id
            }
        })

        const nombreStrings = this.props.colaboradores.all.map(operador => {
            return operador.nombre
        })

        const opcionesNombre = _.uniq(nombreStrings).map((nombre, idx) => {
            return {
                key: idx,
                text: nombre,
                value: nombre
            }
        })

        const emailString = this.props.colaboradores.all.map(colaborador => {
            return colaborador.email
        })

        const opcionesEmail = _.uniq(emailString).map((email, idx) => {
            return {
                key: idx,
                text: email,
                value: email
            }
        })

       /* const telefonoString = this.props.colaboradores.all.map(colaborador => {
            return colaborador.numeroTelefono
        })

        const opcionesTelefono = _.uniq(telefonoString)
            .filter(x => x)
            .map((telefono, idx) => {
                return {
                    key: idx,
                    text: telefono,
                    value: telefono,
                }
            })
        */
        return (
            <Segment color='orange'>
                <Form form={'formaBuscarColaboradores'}  onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid
                            search 
                            selection 
                            label={'id'}
                            name={'id'}
                            options={opcionesId}
                            placeholder='Selecciona el id'
                            value={this.state.id}
                            onChange={this.onChangeValue}
                        />
                        <Form.Select
                            fluid
                            search 
                            selection 
                            label={'Nombre'}
                            name={'nombre'}
                            options={opcionesNombre}
                            placeholder='Selecciona el nombre'
                            value={this.state.nombre}
                            onChange={this.onChangeValue}
                        />
                        <Form.Select
                            fluid
                            search 
                            selection 
                            label={'Correo'}
                            name={'email'}
                            options={opcionesEmail}
                            placeholder='Selecciona el correo'
                            value={this.state.email}
                            onChange={this.onChangeValue}
                        />
                        {/*
                        <Form.Select
                            fluid
                            label={'Teléfono'}
                            name={'numeroTelefono'}
                            options={opcionesTelefono}
                            placeholder='Selecciona el teléfono'
                            value={this.state.numeroTelefono}
                            onChange={this.onChangeValue}
                        />
                        */}
                    </Form.Group>

                    <Form.Group inline>
                        <Form.Field>
                            <Form.Button color='orange' loading={this.props.colaboradores.fetching}>Buscar</Form.Button>
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

FormaBuscarColaboradores.propTypes = {
    colaboradores: PropTypes.object.isRequired,
    onRequestColaboradores: PropTypes.func
}

export default FormaBuscarColaboradores