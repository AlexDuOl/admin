import {connect} from 'react-redux'
import {
    requestInventarioCelulares,
    requestCreateEquipoCelular,
    requestUpdateEquipoCelular,
    startCreateEquipoCelular,
    startUpdateEquipoCelular,
    endCreateEquipoCelular,
    endUpdateEquipoCelular
} from '../../creators/equipos_celulares'

import AdministrarEquiposCelulares from "../../components/AdministrarEquiposCelulares/AdministrarEquiposCelulares";
import {getEquipoCelularSeleccionado} from "../../selectors";

const mapStateToProps = (state) => {
    const {equiposCelulares} = state

    return {
        equiposCelulares,
        equipoCelularSeleccionado : getEquipoCelularSeleccionado(state)
    }
}

const mapActionsToProps = {
    requestInventarioCelulares,
    requestUpdateEquipoCelular,
    requestCreateEquipoCelular,
    startCreateEquipoCelular,
    startUpdateEquipoCelular,
    endCreateEquipoCelular,
    endUpdateEquipoCelular
}

export default connect(mapStateToProps, mapActionsToProps)(AdministrarEquiposCelulares)