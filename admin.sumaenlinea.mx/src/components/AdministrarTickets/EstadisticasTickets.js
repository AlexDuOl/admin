import React from 'react'
import _ from 'lodash'
import { Statistic, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const EstadisticasTickets = ({ tickets }) => {
  const unidad = tickets.all.map(ticket => ( ticket.idUnidad ))

  if (_.uniq(unidad).length === 1) {
    const litros = tickets.all.reduce((acc, cur) => {
      acc += cur.litros
      return acc
    }, 0)

    const gasto = tickets.all.reduce((acc, cur) => {
      acc += cur.monto
      return acc
    }, 0)

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Statistic value={_.round(litros, 2)} label='Litros cargados' size='mini' />
          <Statistic value={_.round(gasto, 2)} label='Pesos' size='mini' />
        </Grid.Column>
      </Grid>
    )
  }

  return (<span />)
}

EstadisticasTickets.propTypes = {
  tickets: PropTypes.object.isRequired,
}

export default EstadisticasTickets