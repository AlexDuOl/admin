import { connect } from 'react-redux'

import { requestColaboradores } from '../../creators/colaboradores'
import AdministrarColaboradores from "../../components/AdministrarColaboradores/AdministrarColaboradores";

const mapStateToProps = (state) => {
    const {
        colaboradores,
    } = state;

    return {
        colaboradores,
    }
};

const mapActionsToProps = {
    requestColaboradores
};

export default connect(mapStateToProps, mapActionsToProps)(AdministrarColaboradores)