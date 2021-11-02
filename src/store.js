// Encargado del state de toda la aplicación completa
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Reducer que contiene varios reducers
import reducer from './reducers/index';

// Creando el store
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;