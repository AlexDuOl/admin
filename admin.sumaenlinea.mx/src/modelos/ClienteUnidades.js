import BaseModel from "./BaseModel"
import RutasCliente from "./RutasCliente"

class ClienteUnidades extends BaseModel {
    constructor(data) {
        super(data);

        this.id = this.getAttribute('id')
        this.cliente = this.getAttribute('cliente')
        console.log(data);
    }

    /** @returns {RutasCliente} */
    getRutasCliente(){
        if(!this.rutasCliente){
            this.rutasCliente = this.getRelationData('rutasCliente') ? new RutasCliente(this.getRelationData('rutasCliente')) : null
        }
        return this.rutasCliente
    }
}

export default ClienteUnidades