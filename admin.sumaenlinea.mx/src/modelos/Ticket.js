import BaseModel from './BaseModel'
import Proveedor from './Proveedor'
import Operador from './Operador'
import Unidad from "./Unidad";

/**
 * TODO: Remove getUnidad, getOperador, getGasolinera
 */

class Ticket extends BaseModel {
  constructor(data) {
    super(data);

    this.fecha = this.getAttribute('fecha');
    this.verificado = this.getAttribute('verificado');
    this.viaCaptura = this.getAttribute('viaCaptura');
    this.kilometraje = this.getAttribute('kilometraje');
    this.tipoCombustible = this.getAttribute('tipoCombustible');
    this.folio = this.getAttribute('folio');
    this.monto = this.getAttribute('monto');
    this.litros = this.getAttribute('litros');
    this.precioCombustible = this.getAttribute('precioCombustible');
    this.idUnidad = this.getAttribute('idUnidad');
    this.idOperador = this.getAttribute('idOperador');
    this.idGasolinera = this.getAttribute('idGasolinera');
    this.idPartida = this.getAttribute('idPartida')
  }

  /**
   * @returns {Proveedor}
   */
  getGasolinera () {
    if(!this.gasolinera)
      this.gasolinera = this.getRelationData('gasolinera') ? new Proveedor(this.getRelationData('gasolinera')) : null;

    return this.gasolinera
  }

  /**
   * @returns {Operador}
   */
  getOperador () {
    if(!this.operador)
      this.operador = this.getRelationData('operador') ? new Operador(this.getRelationData('operador')) : null;

    return this.operador
  }

  /**
   * @returns {Unidad}
   */
  getUnidad () {
    if(!this.unidad)
      this.unidad = this.getRelationData('unidad') ? new Unidad(this.getRelationData('unidad')) : null;

    return this.unidad
  }
}

export default Ticket
