import BaseModel from "./BaseModel"
import LineaCelular from "./LineaCelular";

class EquipoCelular extends BaseModel {
    constructor(data) {
        super(data);

        this.type = this.getAttribute('type')
        this.marca = this.getAttribute('marca')
        this.modelo = this.getAttribute('modelo')
        this.estatus = this.getAttribute('estatus')
        this.lineaTelefonoId = this.getAttribute('lineaTelefonoId')
        this.notas = this.getAttribute('notas')
        this.activo = this.getAttribute('activo')
        this.imei = this.getAttribute('imei')
    }

    /** @returns {LineaCelular} */
    getLineaCelular(){
        if(!this.lineaTelefono){
            this.lineaTelefono = this.getRelationData('lineaTelefono') ? new LineaCelular(this.getRelationData('lineaTelefono')) : null
        }
        return this.lineaTelefono
    }
}

export default EquipoCelular