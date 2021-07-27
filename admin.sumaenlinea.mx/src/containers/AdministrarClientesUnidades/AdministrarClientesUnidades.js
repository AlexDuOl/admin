import { connect } from 'react-redux'

import { requestClientesUnidades } from '../../creators/clientes_unidades'
import AdministrarClientesUnidades from "../../components/AdministrarClientesUnidades/AdministrarClientesUnidades";

const mapStateToProps = (state) => {
    const {
        clientesUnidades,
    } = state;
    console.log(state);
    return {
        clientesUnidades,
    }
};

const mapActionsToProps = {
    requestClientesUnidades
};

export default connect(mapStateToProps, mapActionsToProps)(AdministrarClientesUnidades)