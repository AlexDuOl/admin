import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { isEmpty } from '../../helpers'
import PropTypes from 'prop-types'

const validate = (values) => {
  const errors = {};

  if (!values.fecha) errors.fecha = 'No se ha capturado la fecha del servicio';
  if (!values.folio) errors.folio = 'No se ha capturado el folio de la bitácora';
  if (!values.pasajeros) errors.pasajeros = 'No se ha capturado el número de pasajeros';
  if (!values.hora_arranque) errors.hora_arranque = 'No se ha capturado la hora de arranque';
  if (!values.hora_llegada) errors.hora_llegada = 'No se ha capturado la hora de llegada';
  if (!values.kilometraje_inicial) errors.kilometraje_inicial = 'No se ha capturado el kilometraje inicial';
  if (!values.kilometraje_final) errors.kilometraje_final = 'No se ha capturado el kilometraje final';

  return errors
};

class FormaEditarBitacora extends Component {
  constructor (props) {
    super(props);

    this.state = {
      fecha: '',
      folio: '',
      pasajeros: '',
      hora_arranque: '',
      hora_llegada: '',
      unidad: '',
      kilometraje_inicial: '',
      kilometraje_final: ''
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onCancelarEdicion = this.onCancelarEdicion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    const { bitacoraSeleccionada } = this.props;

    this.setState({
      fecha: bitacoraSeleccionada.fecha ? bitacoraSeleccionada.fecha.slice(0, 10) : '',
      folio: bitacoraSeleccionada.folioBitacora,
      pasajeros: bitacoraSeleccionada.numeroPersonas,
      hora_arranque: bitacoraSeleccionada.horaInicioRuta ? bitacoraSeleccionada.horaInicioRuta.slice(11, 16) : '',
      hora_llegada: bitacoraSeleccionada.horaFinalRuta ? bitacoraSeleccionada.horaFinalRuta.slice(11, 16) : '',
      unidad: bitacoraSeleccionada.idUnidad,
      kilometraje_inicial: bitacoraSeleccionada.kilometrajeInicial,
      kilometraje_final: bitacoraSeleccionada.kilometrajeFinal
    })
  }

  onChangeValue (event, data) {
    if (data) {
      this.setState({ [data.name] : data.value })
    } else {
      this.setState({ [event.target.name] : event.target.value })
    }
  }

  onCancelarEdicion (event) {
    event.preventDefault();
    this.props.finalizarEdicionBitacora()
  }

  onSubmit (event) {
    event.preventDefault();

    if (isEmpty(validate(this.state))) {
      const { bitacoraSeleccionada, requestUpdateBitacora, finalizarEdicionBitacora } = this.props;

      const params = {
        fecha: `${this.state.fecha} 00:00:00`,
        folio_bitacora: this.state.folio,
        numero_personas: this.state.pasajeros,
        tiempo_inicial: `${this.state.fecha} ${this.state.hora_arranque}`,
        tiempo_final: `${this.state.fecha} ${this.state.hora_llegada}`,
        kilometraje_inicial: this.state.kilometraje_inicial,
        kilometraje_final: this.state.kilometraje_final,
        unidad: this.state.unidad
      };

      requestUpdateBitacora(bitacoraSeleccionada.id, params);
      finalizarEdicionBitacora()
    } else {
      alert('Faltan datos, validar que todos los campos estén capturados')
    }
  }

  render () {
    const {
      folio,
      pasajeros,
      fecha,
      hora_arranque,
      hora_llegada,
      unidad,
      kilometraje_inicial,
      kilometraje_final,
    } = this.state;

    return (
      <Form form={'formaEditarBitacora'} onSubmit={this.onSubmit}>
        <Form.Group widths='equal'>
          <Form.Input name='fecha' label='Fecha' type='date' value={fecha} onChange={this.onChangeValue} disabled />
          <Form.Input name='folio' label=' Folio' type='number' step='1' value={folio} onChange={this.onChangeValue} required />
          <Form.Input name='pasajeros' label='Pasajeros' type='number' step='1' min='1' max='46' value={pasajeros} onChange={this.onChangeValue} required />
          <Form.Input name='hora_arranque' label='Arranque' type='time' value={hora_arranque} onChange={this.onChangeValue} required />
          <Form.Input name='hora_llegada' label='Llegada' type='time' value={hora_llegada} onChange={this.onChangeValue} required />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='unidad' label='Unidad' type='number' step='1' min='1' max='200' value={unidad} onChange={this.onChangeValue} />
          <Form.Input name='kilometraje_inicial' label='Kilometraje Inicial' type='number' step='1' value={kilometraje_inicial} onChange={this.onChangeValue} required />
          <Form.Input name='kilometraje_final' label='Kilometraje Final' type='number' step='1' value={kilometraje_final} onChange={this.onChangeValue} required />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label>&nbsp;</label>
            <Button fluid onClick={this.onCancelarEdicion}>Cancelar</Button>
          </Form.Field>

          <Form.Field>
            <label>&nbsp;</label>
            <Button fluid color="orange" disabled={false} loading={false}>Guardar</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

FormaEditarBitacora.propTypes = {
  bitacoraSeleccionada: PropTypes.object.isRequired,
  finalizarEdicionBitacora: PropTypes.func.isRequired,
  requestUpdateBitacora: PropTypes.func.isRequired
}

export default FormaEditarBitacora
