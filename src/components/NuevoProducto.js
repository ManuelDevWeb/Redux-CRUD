import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoActions';
import {mostrarAlertaAction, ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {
  // State del componente
  const [nombre, setNombre]= useState('');
  const [precio, setPrecio]=useState(0);

  // Utilizar useDispatch, para comunicarnos con los actions
  const distpach = useDispatch();

  // useSelector para acceder al state del store
  const cargando=useSelector((state)=>state.productos.loading);
  const error=useSelector((state)=>state.productos.error);
  const alerta=useSelector((state)=>state.alerta.alerta);

  // Llamando el crearNuevoProductoAction de productoAction
  const agregarProducto = (producto) => distpach(crearNuevoProductoAction(producto));

  // Función que se ejecuta cuando el usuario hace submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    // Validar formulario
    if(nombre.trim() === '' || precio <= 0){
      const alerta={
        msg:'Ambos campos son obligatorios',
        classes:'alert alert-danger text-center text-uppercase p3'
      }
      // Llamando el mostrarAlertaAction de alertaActions
      distpach(mostrarAlertaAction(alerta));

      return;
    }

    // Si no hay errores, llamamos el ocultarAlertaAction de alertaActions
    distpach(ocultarAlertaAction());

    // Crear el nuevo producto
    agregarProducto({
      nombre, 
      precio
    });

    // Redireccionar
    history.push('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {
              // Se ejecuta si existe una alerta
              alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null
            }

            <form className="text-center" onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  onChange={e => setPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {
              // Se ejecuta cuando cargando sea true
              cargando ? <p>Cargando...</p> : null
            }
            {
              // Se ejecuta cuando error sea true
              error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
