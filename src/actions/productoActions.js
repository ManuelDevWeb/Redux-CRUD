// Types
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types/index';
// Cliente
import clienteAxios from '../config/axios';
// Alertas
import Swal from 'sweetalert2';

// Funciones que se utiliza en la vista o componente

// Función Crear nuevo producto
export function crearNuevoProductoAction(producto) {
    return async(dispatch) => {
        dispatch(agregarProducto());

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizamos el state
            dispatch(agregarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            // console.log(error);
            // Si hay un error, cambiamos el state
            dispatch(agregarProductoError(true));

            // Alerta
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, vuelve a intentarlo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Función que Descarga los productos de la API
export function obtenerProductosAction() {
    return async(dispatch) => {
        dispatch(descargarProductos());

        try {
            setTimeout(async() => {
                // Obteniendo datos de la API
                const respuesta = await clienteAxios.get('/productos');
                // console.log(respuesta.data);

                // Si todo sale bien, actualizamos el state
                dispatch(descargarProductosExito(respuesta.data));
            }, 1500);

        } catch (error) {
            // console.log(error);
            // Si hay un error, cambiamos el state
            dispatch(descargarProductosError(true));
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = (estado) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
});

// Función para Eliminar un producto
export function eliminarProductoAction(id) {
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            // Eliminando el producto de la API
            await clienteAxios.delete(`/productos/${id}`);

            // Si todo sale bien, actualizamos el state
            dispatch(eliminarProductoExito());

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se eliminó correctamente',
                'success'
            );
        } catch (error) {
            // console.log(error);
            // Si hay un error, cambiamos el state
            dispatch(eliminarProductoError(true));
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = (estado) => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
});

// Función para colocar un producto en Editar
export function obtenerProductoEditarAction(producto) {
    return async(dispatch) => {
        dispatch(obtenerProductoEditar(producto));
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// Función para editar un registro en la API y State
export function editarProductoAction(producto) {
    return async(dispatch) => {
        dispatch(editarProducto());

        try {
            // Actualizando el producto en la API
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            // Si todo sale bien, actualizamos el state
            dispatch(editarProductoExito(producto));
        } catch (error) {
            // console.log(error);
            // Si hay un error, cambiamos el state
            dispatch(editarProductoError(true));
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = (estado) => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: estado
});