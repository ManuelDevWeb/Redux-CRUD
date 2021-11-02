import React,{Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

// Actions de Redux
import {obtenerProductosAction} from '../actions/productoActions';

// Componentes
import Producto from './Producto';


const Productos = () => {
    // Utilizar useDispatch, para comunicarnos con los actions
    const distpach = useDispatch();

    useEffect(()=>{
        // Consultar la API
        // Llamando el obtenerProductosAction de productoAction
        const cargarProductos = () => distpach(obtenerProductosAction());
        cargarProductos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // useSelector para acceder al state del store
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    return (  
        <Fragment>
            <h2 className="text-center my-5">Lista de Productos</h2>

            {
                // Se ejecuta si existe un error
                error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null
            }

            {
                // Se ejecuta si esta cargando
                cargando ? <p className="text-center">Cargando...</p> : null
            }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Validando y mostrando los productos
                        productos.length === 0 ? 'No hay productos' : (
                            productos.map(producto=>(
                                <Producto 
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))
                        )
                    }           
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Productos;