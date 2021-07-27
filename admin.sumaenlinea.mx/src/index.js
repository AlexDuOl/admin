import 'semantic-ui-css/semantic.min.css'
import {Container, Menu, Grid} from 'semantic-ui-react'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import createStore from "./store/createStore";

import AdministrarBitacoras from "./containers/AdministrarBitacoras/AdministrarBitacorasContainer";
import AdministrarTickets from "./containers/AdministrarTickets/AdministrarTicketsContainer";
import AdministrarEquiposCelulares from "./containers/AdministrarEquiposCelulares/AdministrarEquiposCelularesContainer";
import AdministrarColaboradores from "./containers/AdministrarColaboradores/AdministrarColaboradoresContainer";
import AdministrarClientesUnidades from "./containers/AdministrarClientesUnidades/AdministrarClientesUnidades";
import {API_ADDRESS} from "./constants/endpoints";

const store = createStore()

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <Provider store={store}>
                <Router>
                    <Grid>
                        <Grid.Column>
                            <Container fluid>
                                <Menu>

                                    {
                                        API_ADDRESS.includes("tapi") ?
                                            <Menu.Item style={{color: "red", fontWeight: "700"}}>Testing</Menu.Item> :
                                            ""
                                    }
                                    <Menu.Item
                                        as={NavLink}
                                        to={"/bitacoras"}
                                        active={activeItem === 'bitacoras'}
                                        onClick={this.handleItemClick}
                                        exact
                                    >
                                        Bitacoras
                                    </Menu.Item>

                                    <Menu.Item
                                        as={NavLink}
                                        to={"/tickets"}
                                        active={activeItem === 'tickets'}
                                        onClick={this.handleItemClick}
                                        exact>
                                        Tickets
                                    </Menu.Item>

                                    <Menu.Item
                                        as={NavLink}
                                        to={"/equipos-celulares"}
                                        active={activeItem === 'equipos-celulares'}
                                        onClick={this.handleItemClick}
                                        exact>
                                        Celulares
                                    </Menu.Item>

                                    <Menu.Item
                                        as={NavLink}
                                        to={"/listado-colaboradores"}
                                        active={activeItem === 'colaboradores'}
                                        onClick={this.handleItemClick}
                                        exact>
                                        Colaboradores
                                    </Menu.Item>
                                    <Menu.Item
                                        as={NavLink}
                                        to={"/clientes-unidades"}
                                        active={activeItem === 'clientes-unidades'}
                                        onClick={this.handleItemClick}
                                        exact>
                                        Clientes con Unidades
                                    </Menu.Item>
                                </Menu>

                                <Switch>
                                    <Route path={"/bitacoras"}>
                                        <AdministrarBitacoras/>
                                    </Route>
                                    <Route path={"/tickets"}>
                                        <AdministrarTickets/>
                                    </Route>
                                    <Route path={"/equipos-celulares"}>
                                        <AdministrarEquiposCelulares/>
                                    </Route>
                                    <Route path={"/listado-colaboradores"}>
                                        <AdministrarColaboradores />
                                    </Route>
                                    <Route path={"/clientes-unidades"}>
                                        <AdministrarClientesUnidades/>
                                    </Route>
                                </Switch>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'))