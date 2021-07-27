import moment from 'moment'
import React, { Component } from 'react'
import {Segment, Form, Input, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {
  extraerParametrosBusqueda,
  extraerOpcionesProveedores,
  extraerOpcionesOperadores,
  extraerOpcionesClientes,
  extraerOpcionesRutas,
  extraerOpcionesEstructuras
} from '../../helpers'

class FormaBuscarBitacoras extends Component {

  constructor (props) {
    super(props);

    this.initialValues = {
      desde: moment().day(3 - 7).format('YYYY-MM-DD'),
      hasta: moment().day(2).format('YYYY-MM-DD'),
      proveedor: 1,
      cliente: -1,
      ruta: -1,
      estructura: -1,
      operador: -1,
      unidad: '',
      id: '',
    };

    this.state = {
      ...this.initialValues
    };
  }

  onSubmit = () => {

    const paramIdOnly = {
      id: 'id'
    }

    const paramsAllOther = {
      desde: 'hora_arranque=ge',
      hasta: 'hora_arranque=le',
      operador: 'id_operador',
      cliente: 'id_cliente',
      ruta: 'id_ruta',
      estructura: 'id_estructura',
      proveedor: 'id_proveedor',
      unidad: 'id_unidad'
    };

    let paramsMap = {}

    if(this.state.id.length) {
      paramsMap = {
        ...paramIdOnly
      }
    } else {
      paramsMap = {
        ...paramsAllOther
      }
    }

    const params = extraerParametrosBusqueda(this.state, paramsMap);
    params.push('sort(+hora_arranque)');

    this.props.requestBitacoras(params)
  }

  onReset = (event) => {
    event.preventDefault();

    this.setState({
      ...this.initialValues
    })
  }

  triggerChangeCliente = (event, data) => {
    this.onChangeValue(event, data);

    const { invalidarRutas, invalidarEstructuras, requestRutas } = this.props;

    invalidarRutas();
    invalidarEstructuras();

    this.setState({
      ruta: -1,
      estructura: -1
    });

    requestRutas({
      params: [`id_cliente=${data.value}`, 'sort(+nombre)', 'activa=true']
    })
  }

  triggerChangeRuta = (event, data) => {
    this.onChangeValue(event, data);

    this.props.invalidarEstructuras();

    this.setState({
      estructura: -1
    });

    this.props.requestEstructuras({
      params: [`id_ruta=${data.value}`, 'sort(+nombre)', 'activa=true']
    })
  }

  triggerChangeProveedor = (event, data) => {
    this.onChangeValue(event, data);

    this.setState({
      operador: -1
    });

    if (this.state.proveedor !== 1) {
      this.props.requestOperadoresSubcontratados(['activo=true', 'sort(+nombre)', `id_proveedor=${data.value}`])
    }
  }

  onChangeValue = (event, data) => {
    if (data) {
      this.setState({ [data.name] : data.value })
    } else {
      this.setState({ [event.target.name] : event.target.value })
    }
  }

  render () {
    const {
      clientes,
      rutas,
      estructuras,
      proveedores,
      operadores,
      bitacoras
    } = this.props;

    const {
      desde,
      hasta,
      proveedor,
      cliente,
      ruta,
      estructura,
      operador,
      unidad,
      id,
    } = this.state;

    const opcionesOperadores = operadores;

    return (
      <Segment color='orange'>
        <Form form={'formaBuscarBitacoras'} onSubmit={this.onSubmit}>
          <Form.Group widths='equal'>
            <Form.Field control={Input}  label="Id" name="id" type="number" step="1" value={id} onChange={this.onChangeValue} />
            <Form.Input name='desde' label='Desde' type='date' value={desde} onChange={this.onChangeValue} />
            <Form.Input name='hasta' label='Hasta' type='date' value={hasta} onChange={this.onChangeValue} />
            <Form.Select name='proveedor' label='Proveedor' fluid search selection loading={proveedores.fetching}
              options={proveedores.all.map(extraerOpcionesProveedores)} value={proveedor}
              onChange={this.triggerChangeProveedor} />
          </Form.Group>


            <Form.Group widths='equal'>
              <Form.Select name='cliente' label='Cliente' fluid search selection loading={clientes.fetching}
                options={clientes.all.map(extraerOpcionesClientes)} value={cliente}
                onChange={this.triggerChangeCliente} />

              <Form.Select name='ruta' label='Ruta' fluid search selection loading={rutas.fetching}
                options={rutas.all.map(extraerOpcionesRutas)} value={ruta} onChange={this.triggerChangeRuta} />

              <Form.Select name='estructura' label='Estructura' fluid search selection loading={estructuras.fetching}
                options={estructuras.all.map(extraerOpcionesEstructuras)} value={estructura}
                onChange={this.onChangeValue} />

            </Form.Group>


          <Form.Group widths='equal'>

            <Form.Select name='operador' label='Operador' fluid search selection loading={opcionesOperadores.fetching}
                         options={opcionesOperadores.all.map(extraerOpcionesOperadores)} value={operador}
                         onChange={this.onChangeValue} />

            <Form.Input name='unidad' label='Unidad' type='number' step='1' fluid value={unidad} onChange={this.onChangeValue} />


            <Form.Field>
              <label>&nbsp;</label>
              <Button.Group widths={2}>
                <Button color='orange' fluid disabled={false} loading={bitacoras.fetching}>
                  <Button.Content visible>Buscar</Button.Content>
                </Button>
                <Button fluid onClick={this.onReset}>
                  <Button.Content visible>Limpiar</Button.Content>
                </Button>
              </Button.Group>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

FormaBuscarBitacoras.propTypes = {
  requestBitacoras: PropTypes.func.isRequired,
  invalidarRutas: PropTypes.func.isRequired,
  invalidarEstructuras: PropTypes.func.isRequired,
  requestRutas: PropTypes.func.isRequired,
  requestEstructuras: PropTypes.func.isRequired,
  requestOperadoresSubcontratados: PropTypes.func,//.isRequired,
  clientes: PropTypes.object.isRequired,
  rutas: PropTypes.object.isRequired,
  estructuras: PropTypes.object.isRequired,
  proveedores: PropTypes.object.isRequired,
  operadores: PropTypes.object.isRequired,
  bitacoras: PropTypes.object.isRequired
}

export default FormaBuscarBitacoras
