import { combineReducers } from 'redux';
// Reducers
import { productosReducer } from './productosReducer';
import { alertaReducer } from './alertaReducers'

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
});