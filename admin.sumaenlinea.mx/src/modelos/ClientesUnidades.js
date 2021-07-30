import BaseModel from './BaseModel'
import RutasCliente from './RutasCliente'

class ClientesUnidades extends BaseModel {
    constructor(data) {
        super(data)
console.log(data);
        this.id = data.id
        this.cliente = data.cliente
    }

    /** @returns {RutasCliente} */
    getRutasCliente(){
        if(!this.rutas){
            this.rutas = this.getRelationData('rutas') ? new RutasCliente(this.getRelationData('rutas')) : null
        }
        return this.rutas
    }
}
export default ClientesUnidades