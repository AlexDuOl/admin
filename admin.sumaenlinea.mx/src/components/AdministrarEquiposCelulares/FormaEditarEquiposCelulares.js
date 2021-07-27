import React, {Component} from 'react'
import {Segment, Form, Select} from 'semantic-ui-react'
import PropTypes from "prop-types";

const estatus = [
    'FUNCIONAL',
    'SEMI-FUNCIONAL',
    'DAÑADO',
    'EXTRAVIADO',
    'OBSOLETO',
    'ROBADO'
].map((estatus, idx) => {
    return {key: idx, value: estatus, text: estatus}
})

class FormaEditarEquiposCelulares extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marca: "",
            modelo: "",
            activo: true,
            estatusEquipo: "FUNCIONAL",
            imei: "000000000000000000",
            notas: ""
        }
    }

    onChangeValue = (event, data) => {
        if (data) {
            // Componentes de React Semantic
            switch (data.type) {
                case "checkbox":
                    this.setState({[data.name]: data.checked})
                    return
                default:
                    this.setState({[data.name]: data.value})
            }
        } else {
            // Componentes normales de HTML5
            switch (event.target.type) {
                case "checkbox":
                    this.setState({[event.target.name]: event.target.checked})
                    return
                default:
                    this.setState({[event.target.name]: event.target.value})
            }
        }
    }

    onSubmit = () => {

        const {marca, modelo, estatusEquipo, imei, activo, notas} = this.state

        const payload = {
            "marca": marca ? marca : "Sin definir",
            "modelo": modelo ? modelo : "Sin definir",
            "estatus": estatusEquipo ? estatusEquipo : "FUNCIONAL",
            "imei": imei,
            "activo": activo,
            "notas": notas,
            "linea_telefono": 1
        }

        const { equipoCelularSeleccionado } = this.props

        if(equipoCelularSeleccionado){
            this.props.onPutEquipoCelular(equipoCelularSeleccionado.id, payload)
        } else {
            this.props.onPostEquipoCelular(payload)
        }

    }

    componentDidMount() {
        const { equipoCelularSeleccionado } = this.props

        if(equipoCelularSeleccionado) {

            this.setState({
                marca: equipoCelularSeleccionado.marca,
                modelo: equipoCelularSeleccionado.modelo,
                estatus: equipoCelularSeleccionado.estatus,
                imei: equipoCelularSeleccionado.imei,
                activo: equipoCelularSeleccionado.activo,
                notas: equipoCelularSeleccionado.notas ? equipoCelularSeleccionado.notas : ""
            })
        }
    }

    onCloseModal = () => {
        this.props.endUpdateEquipoCelular()
        this.props.endCreateEquipoCelular()
    }

    render() {
        const {sending} = this.props
        const {marca, modelo, estatusEquipo, imei, notas, activo} = this.state

        return (
            <Segment>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid name='marca' label='Marca' placeholder='Ingresa la marca' value={marca}
                                    onChange={this.onChangeValue} required/>
                        <Form.Input fluid name='modelo' label='Modelo' placeholder='Ingresa el modelo' value={modelo}
                                    onChange={this.onChangeValue} required/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Estatus del Equipo</label>
                            <Select name='estatusEquipo' placeholder='Selecciona un estatus' options={estatus}
                                    value={estatusEquipo} onChange={this.onChangeValue} required/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input fluid name='imei' type='text' label='IMEI del equipo' placeholder='IMEI'
                                        value={imei} onChange={this.onChangeValue}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea name='notas' label='Notas' value={notas} onChange={this.onChangeValue}/>
                    <Form.Checkbox toggle label='Activo' name='activo' checked={activo} onChange={this.onChangeValue}
                                   required/>
                    <Form.Group inline>
                        <Form.Field>
                            <Form.Button color='orange' disabled={sending} loading={sending}>Guardar</Form.Button>
                        </Form.Field>
                        <Form.Field>
                            <Form.Button fluid onClick={this.onCloseModal}>Cancelar</Form.Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
}

FormaEditarEquiposCelulares.propTypes =
    {
        onPostEquipoCelular: PropTypes.func.isRequired,
        sending: PropTypes.bool.isRequired,
        endCreateEquipoCelular: PropTypes.func.isRequired,
        equipoCelularSeleccionado: PropTypes.object,
        endUpdateEquipoCelular: PropTypes.func.isRequired,
        onPutEquipoCelular: PropTypes.func.isRequired
}

export default FormaEditarEquiposCelulares