import BaseModel from "./BaseModel";

class LineaCelular extends BaseModel {
    constructor(data) {
        super(data);

        this.numero = this.getAttribute('numero')
        this.activa = this.getAttribute('activa')
    }
}

export default LineaCelular