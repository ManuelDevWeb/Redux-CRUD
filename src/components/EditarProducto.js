import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// Actions de Redux
import {editarProductoAction} from '../actions/productoActions';

const EditarProducto = () => {
  // Nuevos state de producto
  const [producto, setProducto]= useState({
    nombre: '',
    precio: ''
  });

  const history=useHistory();

  // Utilizar useDispatch, para comunicarnos con los actions
  const distpach = useDispatch();

  // useSelector para acceder al state del store
  const productoEditar=useSelector((state)=>state.productos.productoEditar);

  // Llenar el state automáticamente
  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);

  // Leer los datos del formulario
  const onChangeFormulario=(e)=>{
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }
  
  const {nombre, precio} = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();
    // Llamando el editarProductoAction de productoAction
    distpach(editarProductoAction(producto));
    history.push('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text- mb-4 font-weight-bold text-center">
              Editar Producto
            </h2>

            <form 
              className="text-center"
              onSubmit={submitEditarProducto}
            >
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
