import React, {Component} from 'react'
import {Form, Segment} from "semantic-ui-react";
import moment from "moment";
import PropTypes from "prop-types";
import _ from 'lodash'

class FormaBuscarEquiposCelulares extends Component {

    constructor(props) {
        super(props);

        this.initialValues = {
            desde: moment().day(3 - 7).format('YYYY-MM-DD'),
            hasta: moment().day(2).format('YYYY-MM-DD'),
            marca: '',
            modelo: '',
            estatus: '',
            activo: '',
            imei: '',
        }

        this.state = {
            ...this.initialValues
        }
    }

    onChangeValue = (event, data) => {
        if (data) {
            this.setState({ [data.name] : data.value })
        } else {
            this.setState({ [event.target.name] : event.target.value })
        }
    }

    onSubmit = () => {
        const params = [
            'id=ge=1'
        ]

        if(this.state.activo) {
            params.push(`activo=${this.state.activo}`)
        }

        if(this.state.marca) {
            params.push(`marca=${this.state.marca}`)
        }

        if(this.state.modelo) {
            params.push(`modelo=${this.state.modelo}`)
        }

        if(this.state.estatus) {
            params.push(`estatus=${this.state.estatus}`)
        }

        if(this.state.imei) {
            params.push(`imei=${this.state.imei}`)
        }

        this.props.onRequestCelulares(params)
    }

    onReset = () => {
        this.setState({
            ...this.initialValues
        })
    }
    startCreateEquipo = (e) => {
        e.preventDefault(e)
        this.props.startCreateEquiposCelulares()
    }

    render () {
        const marcasString = this.props.celulares.all.map(celular => {
            return celular.marca
        })

        const opcionesMarcas = _.uniq(marcasString).map((marca, idx) => {
            return {
                key: idx,
                text: marca,
                value: marca
            }
        })

        const modelosStrings = this.props.celulares.all.map(celular => {
            return celular.modelo
        })

        const opcionesModelos  = _.uniq(modelosStrings).map((modelo, idx) => {
            return {
                key: idx,
                text: modelo,
                value: modelo
            }
        })

        const estatusValue = this.props.celulares.all.map(celular => {
            return celular.estatus
        })

        const opcionesEstatus = _.uniq(estatusValue).map((estatus, idx) => {
            return {
                key: idx,
                text: estatus,
                value: estatus
            }
        })

        const activoValue = this.props.celulares.all.map(celular => {
            return celular.activo
        })

        const opcionesActivo= _.uniq(activoValue).map((activo, idx) => {
            return (
                activo === true ? {
                            key: idx,
                            text: "Activo",
                            value: true
                        } : {
                            key: idx,
                            text: "Inactivo",
                            value: false
                        }
                )
        })

        const imeiValues = this.props.celulares.all.map(celular => {
            return celular.imei
        })

        const opcionesImei = _.uniq(imeiValues).map((imei, idx) => {
            return {
                key: idx,
                text: imei,
                value: imei,
            }
        })

        return(
            <Segment color='orange'>
                <Form form={'formaBuscarEquiposCelulares'}  onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Desde' name={'desde'} type='date' value={this.state.desde} onChange={this.onChangeValue} />
                        <Form.Input fluid label='Hasta' name={'hasta'} type='date' value={this.state.hasta} onChange={this.onChangeValue} />
                        <Form.Select
                            fluid
                            search 
                            selection
                            label={'Marca'}
                            name={'marca'}
                            options={opcionesMarcas}
                            placeholder='Selecciona la marca'
                            value={this.state.marca}
                            onChange={this.onChangeValue}
                        />
                        <Form.Select
                            fluid
                            search 
                            selection
                            label='Modelo'
                            name={'modelo'}
                            options={opcionesModelos}
                            placeholder='Selecciona el modelo'
                            value={this.state.modelo}
                            onChange={this.onChangeValue}
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid
                            search 
                            selection
                            label='Condiciones del equipo'
                            name={'estatus'}
                            options={opcionesEstatus}
                            placeholder='Selecciona las condiciones del equipo'
                            value={this.state.estatus}
                            onChange={this.onChangeValue}
                        />

                        <Form.Select
                            fluid
                            search 
                            selection
                            label='Estatus'
                            name={'activo'}
                            options={opcionesActivo}
                            placeholder='Selecciona el estatus'
                            value={this.state.activo}
                            onChange={this.onChangeValue}
                        />

                        <Form.Select
                            fluid
                            search 
                            selection
                            label='Imei'
                            name={'imei'}
                            options={opcionesImei}
                            placeholder='Selecciona el imei'
                            value={this.state.imei}
                            onChange={this.onChangeValue}
                        />

                    </Form.Group>

                    <Form.Group inline>
                        <Form.Field>
                            <Form.Button color='orange' loading={this.props.celulares.fetching}>Buscar</Form.Button>
                        </Form.Field>
                        <Form.Field>
                            <Form.Button onClick={this.onReset}>Limpiar</Form.Button>
                        </Form.Field>
                        <Form.Field>
                            <Form.Button fluid onClick={this.startCreateEquipo}>Nuevo</Form.Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }

}

FormaBuscarEquiposCelulares.propTypes = {
    celulares: PropTypes.object.isRequired,
    onRequestCelulares: PropTypes.func.isRequired,
    startCreateEquiposCelulares: PropTypes.func.isRequired
}

export default FormaBuscarEquiposCelulares