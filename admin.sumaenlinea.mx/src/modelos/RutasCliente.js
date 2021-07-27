import BaseModel from "./BaseModel";
class RutasCliente extends BaseModel {
    constructor(data) {
        super(data);

        this.fecha = this.getAttribute('FECHA')
        this.personas = this.getAttribute('PERSONAS')
        this.descripcion = this.getAttribute('DESCRIPCION')
        this.marca = this.getAttribute('MARCA')
        this.modelo = this.getAttribute('MODELO')
        this.nombre = this.getAttribute('NOMBRE')
    }
}

export default RutasCliente