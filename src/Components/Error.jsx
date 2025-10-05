import React from "react";
import './error.css';

const Error = ({setIsProduct, setIsError }) => {
  return (
    <div 
      className="contenedor-error">
        <h1>Ocurrio un error!!!</h1>
        <button
          onClick={() => { 
            setIsError(false)
            setIsProduct(true)
            //window.location.href = "http://localhost:5173/";
          }}
        >Volver a la pagina principal</button>
    </div>
  )
}
export default Error;