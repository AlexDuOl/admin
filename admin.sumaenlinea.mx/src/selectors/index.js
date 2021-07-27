import { createSelector } from 'reselect'

const getTickets = (state) => (state.tickets.all);
const getIdTicketSeleccionado = (state) => (state.tickets.editing.id);

export const getTicketSeleccionado = createSelector(
  [getTickets, getIdTicketSeleccionado], (xs, id) => ( xs.find(x => ( x.id === id))));


const getBitacoras = (state) => (state.bitacoras.all);
const getIdBitacoraSeleccionada = (state) => (state.bitacoras.editing.id);

export const getBitacoraSeleccionada = createSelector(
  [getBitacoras, getIdBitacoraSeleccionada], (xs, id) => ( xs.find(x => ( x.id === id))));

const getEquiposCelulares = (state) => (state.equiposCelulares.all);
const getIdEquipoCelularSeleccionado = (state) => (state.equiposCelulares.updating.id);

export const getEquipoCelularSeleccionado = createSelector(
    [getEquiposCelulares, getIdEquipoCelularSeleccionado], (xs, id) => ( xs.find(x => ( x.id === id))));


