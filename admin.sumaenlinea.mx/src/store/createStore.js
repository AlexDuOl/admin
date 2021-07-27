import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import makeRootReducer from './reducers'
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware();

export default () => {
    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================

    //const middleware = [sagaMiddleware]

    let composeEnhancers = compose;

    //if (true) {lkqw,lows
        const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (typeof composeWithDevToolsExtension === 'function') {
            composeEnhancers = composeWithDevToolsExtension
        }
    //}

    const store = createStore(
        makeRootReducer(),
        composeEnhancers(applyMiddleware(sagaMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}
