import moment from 'moment'
import React, {Component} from 'react'
import {Form, Button, Select, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {extraerOpcionesOperadores, extraerOpcionesProveedores} from '../../helpers'

class FormaEditarTicket extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fecha: moment().format('YYYY-MM-DD'),
            hora: '00:00',
            unidad: '',
            operador: -1,
            gasolinera: -1,
            folio: '',
            kilometraje: '',
            tipo_combustible: -1,
            litros: '',
            precio: '',
            idPartida: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.onFinalizarEdicion = this.onFinalizarEdicion.bind(this)
    }

    componentDidMount() {
        const {ticket} = this.props

        if (ticket) {
            this.setState({
                fecha: ticket.fecha.slice(0, 10),
                hora: ticket.fecha.slice(11),
                unidad: ticket.idUnidad,
                operador: ticket.idOperador,
                gasolinera: ticket.idGasolinera,
                folio: ticket.folio,
                kilometraje: ticket.kilometraje,
                tipo_combustible: ticket.tipoCombustible,
                litros: ticket.litros,
                precio: ticket.precioCombustible,
                idPartida: ticket.idPartida,
            })
        }
    }

    onChangeValue(event, data) {
        if (data) {
            this.setState({[data.name]: data.value})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    onSubmit(event) {
        event.preventDefault()

        const {ticket, onRequestCreateTicket, onRequestUpdateTicket, onFinalizarEdicionTicket} = this.props

        const params = {
            fecha: `${this.state.fecha} ${this.state.hora}`,
            unidad: this.state.unidad,
            operador: this.state.operador,
            gasolinera: this.state.gasolinera,
            folio: this.state.folio,
            kilometraje: this.state.kilometraje,
            tipo_combustible: this.state.tipo_combustible,
            litros: this.state.litros,
            precio_combustible: this.state.precio,
            verificado: true,
            idPartida: this.state.idPartida,
        }

        if (ticket) {
            onRequestUpdateTicket(ticket.id, params)
        } else {
            params.via_captura = 1
            onRequestCreateTicket(params)
        }

        onFinalizarEdicionTicket()
    }

    onFinalizarEdicion(event) {
        event.preventDefault()

        this.props.onFinalizarEdicionTicket()
    }

    render() {

        const {
            operadores,
            proveedores,
        } = this.props

        const {
            fecha,
            hora,
            unidad,
            operador,
            gasolinera,
            folio,
            kilometraje,
            tipo_combustible,
            litros,
            precio,
            idPartida
        } = this.state

        return (
            <Segment>
                    <Form form={'forma-editar-ticket'} onSubmit={this.onSubmit}>
                        <Form.Group widths="equal">
                            <Form.Input name="fecha" label="Fecha" type="date" value={fecha}
                                        onChange={this.onChangeValue}
                                        required disabled={idPartida > 0} />
                            <Form.Input name="hora" label="Hora" type="time" value={hora} onChange={this.onChangeValue}
                                        required disabled={idPartida > 0} />
                            <Form.Input name="unidad" label="Unidad" type="number" step="1" min="1" max="199"
                                        value={unidad}
                                        onChange={this.onChangeValue} required/>
                            <Form.Field control={Select} label='Operador' name="operador" search
                                        placeholder='Selecciona un operador'
                                        options={operadores.all.map(extraerOpcionesOperadores)}
                                        loading={operadores.fetching} value={operador} onChange={this.onChangeValue}
                                        required disabled={idPartida > 0}/>

                            <Form.Field control={Select} label="Gasolinera" name="gasolinera" basic search
                                        placeholder="Selecciona alguna gasolinera"
                                        options={proveedores.all.map(extraerOpcionesProveedores)}
                                        loading={proveedores.fetching} value={gasolinera} onChange={this.onChangeValue}
                                        required disabled={idPartida > 0} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input name="folio" label="Folio" value={folio} onChange={this.onChangeValue} required
                                        disabled={idPartida > 0} />
                            <Form.Input name="kilometraje" label="Kilometraje" type="number" step="1"
                                        value={kilometraje} onChange={this.onChangeValue} required/>
                            <Form.Input control={Select} name="tipo_combustible" label="Tipo combustible" basic search
                                        options={[{key: 0, text: 'Magna', value: 'Magna'}, {
                                            key: 1,
                                            text: 'Diesel',
                                            value: 'Diesel'
                                        }, {key: 2, text: 'Gas', value: 'Gas'}]}
                                        value={tipo_combustible} onChange={this.onChangeValue} required disabled={idPartida > 0} />
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Form.Input name="litros" label="Litros" type="number" step="any" value={litros}
                                        onChange={this.onChangeValue} required disabled={idPartida > 0} />
                            <Form.Input name="precio" label="Precio" type="number" step="any" value={precio}
                                        onChange={this.onChangeValue} required disabled={idPartida > 0} />
                            <Form.Field>
                                <label>&nbsp;</label>
                                <Button.Group widths={2}>
                                    <Button fluid onClick={this.onFinalizarEdicion}>Cancelar</Button>
                                    <Button fluid color="orange">Guardar</Button>
                                </Button.Group>
                            </Form.Field>
                        </Form.Group>
                    </Form>
            </Segment>
        )
    }
}

FormaEditarTicket.propTypes = {
    ticket: PropTypes.object,
    onRequestCreateTicket: PropTypes.func.isRequired,
    onRequestUpdateTicket: PropTypes.func.isRequired,
    onFinalizarEdicionTicket: PropTypes.func.isRequired,
    operadores: PropTypes.object.isRequired,
    proveedores: PropTypes.object.isRequired,
}

export default FormaEditarTicket
