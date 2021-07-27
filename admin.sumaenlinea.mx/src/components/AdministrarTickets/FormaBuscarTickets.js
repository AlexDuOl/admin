import moment from 'moment'
import React, { Component } from 'react'
import { Segment, Select, Form, Input, Button } from 'semantic-ui-react'
import  PropTypes from 'prop-types'

import { extraerParametrosBusqueda, extraerOpcionesOperadores, extraerOpcionesProveedores } from '../../helpers'

class FormaBuscarTickets extends Component {

  constructor (props) {
    super(props)

    this.initialState = {
      id: '',
      unidad: '',
      kilometraje: '',
      folio: '',
      desde: moment().day(3 - 7).format('YYYY-MM-DD'),
      hasta: moment().day(2).format('YYYY-MM-DD'),
      operador: -1,
      gasolinera: -1,
    }

    this.state = this.initialState

  }

  componentDidMount () {
    this.props.requestProveedores({
      params: ['activo=true', 'id_categoria=1', 'sort(+empresa)']
    })

    this.props.requestOperadores({
      params: ['activo=true', 'sort(+nombre)']
    })
  }

  //TODO: Aplicar curring parcial para generalizar y especializar según el componente
  onSubmit = () => {

    const paramIdOnly = {
      id: 'id'
    }

    const paramsAllOthers = {
      unidad: 'id_unidad',
      kilometraje: 'kilometraje',
      folio: 'folio',
      desde: 'fecha=ge',
      hasta: 'fecha=le',
      operador: 'id_operador',
      gasolinera: 'id_gasolinera',
    }

    let paramsMap = {}

    if(this.state.id.length){
      paramsMap = {
        ...paramIdOnly
      }
    }else{
      paramsMap = {
        ...paramsAllOthers
      }
    }

    const params = extraerParametrosBusqueda(this.state, paramsMap)
    params.push('sort(-fecha)')
    this.props.requestBuscarTickets(params)
  }

  //TODO: Extraer a una función general
  onReset = () => {
    this.setState({
      ...this.initialState
    })
  }

  //TODO: Extraer a una función general
  onChangeValue = (event, data) => {
    if(data) {
      this.setState({ [data.name] : data.value })
    } else {
      this.setState({ [event.target.name] : event.target.value })
    }
  }

  onIniciarEdicion = () => {
    this.props.iniciarEdicionTicket(-2)
  }

  render () {

    const {
      operadores,
      proveedores,
      tickets,
    } = this.props

    const {
      id,
      unidad,
      kilometraje,
      folio,
      desde,
      hasta,
      operador,
      gasolinera,
    } = this.state

    return (
      <Segment color='orange'>
        <Form form={'forma-buscar-tickets'} onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Field control={Input} fluid label="Id" name="id" type="number" step="1" value={id} onChange={this.onChangeValue} />
            <Form.Field control={Input} fluid label="Unidad" name="unidad" type="number" step="1" value={unidad} onChange={this.onChangeValue} />
            <Form.Field control={Input} fluid label="Kilometraje" name="kilometraje" type="number" step="1" value={kilometraje} onChange={this.onChangeValue} />
            <Form.Field control={Input} fluid label="Folio" name="folio" value={folio} onChange={this.onChangeValue} />
            <Form.Field control={Input} fluid label="Desde" name="desde" type="date" value={desde} onChange={this.onChangeValue} />
            <Form.Field control={Input} fluid label="Hasta" name="hasta" type="date" value={hasta} onChange={this.onChangeValue} />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field control={Select} fluid label='Filtrar por Operador' name="operador" search placeholder='Selecciona un operador'
              options={operadores.all.map(extraerOpcionesOperadores)} loading={operadores.fetching} value={operador} onChange={this.onChangeValue} />

            <Form.Field control={Select} fluid label='Filtrar por Gasolinera' name="gasolinera" basic search placeholder="Selecciona alguna gasolinera"
              options={proveedores.all.map(extraerOpcionesProveedores)} loading={proveedores.fetching} value={gasolinera} onChange={this.onChangeValue} />

            <Form.Field>
              <label>&nbsp;</label>
              <Button.Group widths={3}>
                <Button color='orange' fluid loading={tickets.fetching}>
                  <Button.Content visible>Buscar</Button.Content>
                </Button>
                <Button fluid onClick={this.onReset}>
                  <Button.Content visible>Limpiar</Button.Content>
                </Button>
                <Button fluid onClick={this.onIniciarEdicion}>
                  <Button.Content visible>Nuevo</Button.Content>
                </Button>
              </Button.Group>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

FormaBuscarTickets.propTypes = {
  requestProveedores: PropTypes.func.isRequired,
  requestOperadores: PropTypes.func.isRequired,
  requestBuscarTickets: PropTypes.func.isRequired,
  iniciarEdicionTicket: PropTypes.func.isRequired,
  operadores: PropTypes.object.isRequired,
  proveedores: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired
}

export default FormaBuscarTickets
