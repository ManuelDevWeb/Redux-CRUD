import React from 'react';
import { useDispatch } from "react-redux";
// Router
import { useHistory } from 'react-router-dom';
// Actions de Redux
import {eliminarProductoAction, obtenerProductoEditarAction} from '../actions/productoActions';
// Sweet Alert
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    // Utilizar useDispatch, para comunicarnos con los actions
    const distpach = useDispatch();
    // Habilitar history para redireccion
    const history = useHistory();

    // Confirmas si desea eliminar
    const confirmarEliminarProducto=(id)=>{
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Llamando el eliminarProductoAction de productoAction
                distpach(eliminarProductoAction(id));
            }
        })
    }

    // Función que redirige de forma programada
    const redireccionarEdicion=(producto)=>{
        // Llamando el obtenerProductoEditarAction de productoAction
        distpach(obtenerProductoEditarAction(producto));
        history.push(`/productos/editar/${producto.id}`);        
    }

    return (  
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> $ {precio} </span></td>
            <td className="acciones">
                <button
                    type="button"                    
                    className="btn btn-primary mr-2"
                    onClick={()=>redireccionarEdicion(producto)}
                >
                    Editar
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={()=>confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}
 
export default Producto;