// Types
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index';

// Funciones que se utiliza en la vista o componente

// Función para mostrar una alerta
export function mostrarAlertaAction(alerta) {
    return (dispatch) => {
        dispatch(crearAlerta(alerta));
    }
}

const crearAlerta = (alerta) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

// Función para ocultar una alerta
export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch(ocultarAlerta());
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
});