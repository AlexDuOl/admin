import {
  REQUEST_BUSCAR_TICKETS,
  REQUEST_BUSCAR_TICKETS_SUCCESS,
  REQUEST_BUSCAR_TICKETS_FAILED,
  REQUEST_CREATE_TICKET,
  REQUEST_CREATE_TICKET_SUCCESS,
  REQUEST_CREATE_TICKET_FAILED,
  REQUEST_UPDATE_TICKET,
  REQUEST_UPDATE_TICKET_SUCCESS,
  REQUEST_UPDATE_TICKET_FAILED,
  REQUEST_DELETE_TICKET,
  REQUEST_DELETE_TICKET_SUCCESS,
  REQUEST_DELETE_TICEKT_FAILED,
  INICIAR_EDICION_TICKET,
  FINALIZAR_EDICION_TICKET
} from '../constants/action_types'

export const requestBuscarTickets = (params) => {
  return {
    type: REQUEST_BUSCAR_TICKETS,
    payload: { params }
  }
}

export const onRequestBuscarTicketsSuccess = (response) => {
  return {
    type: REQUEST_BUSCAR_TICKETS_SUCCESS,
    payload: response
  }
}

export const onRequestBuscarTicketsFailed = (response) => {
  return {
    type: REQUEST_BUSCAR_TICKETS_FAILED,
    payload: response
  }
}

export const requestCreateTicket = (params) => {
  return {
    type: REQUEST_CREATE_TICKET,
    payload: {
      params
    }
  }
}

export const onRequestCreateTicketSuccess = (response) => {
  return {
    type: REQUEST_CREATE_TICKET_SUCCESS,
    payload: response
  }
}

export const onRequestCreateTicketFailed = (response) => {
  return {
    type: REQUEST_CREATE_TICKET_FAILED,
    payload: response
  }
}

export const requestUpdateTicket = (id, params) => {
  return {
    type: REQUEST_UPDATE_TICKET,
    payload: {
      id,
      params
    }
  }
}

export const onRequestUpdateTicketSuccess = (id, response) => {
  return {
    type: REQUEST_UPDATE_TICKET_SUCCESS,
    payload: {
      id,
      response
    }
  }
}

export const onRequestUpdateTicketFailed = (id, response) => {
  return {
    type: REQUEST_UPDATE_TICKET_FAILED,
    payload: {
      id,
      response
    }
  }
}


export const requestDeleteTicket = (id) => {
  return {
    type: REQUEST_DELETE_TICKET,
    payload: {
      id
    }
  }
}

export const onRequestDeleteTicketSuccess = (id, response) => {
  return {
    type: REQUEST_DELETE_TICKET_SUCCESS,
    payload: {
      id,
      response
    }
  }
}

export const onRequestDeleteTicketFailed = (id, response) => {
  return {
    type: REQUEST_DELETE_TICEKT_FAILED,
    payload: {
      id,
      response
    }
  }
}

export const iniciarEdicionTicket = (id) => {
  return {
    type: INICIAR_EDICION_TICKET,
    payload: id
  }
}

export const finalizarEdicionTicket = () => {
  return {
    type: FINALIZAR_EDICION_TICKET
  }
}
