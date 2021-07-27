export default class BaseModel {
  constructor (data) {

    if(!data) throw new Error('Invalid data payload');

    this.data = data;
    this.attributes = data.attributes;
    this.relations = data.relations;

    this.id = data.id
    this.cliente = data.cliente
    console.log(this.cliente);
  }

  getAttribute (name) {
    return (this.attributes[name]) ? this.attributes[name] : null
  }

  getRelationData (name) {
    return (this.relations[name]) ? this.relations[name].data : null
  }
}
