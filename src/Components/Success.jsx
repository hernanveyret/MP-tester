import React from "react";
import './error.css';

const Success = ({setIsProduct, setIsSuccess}) => {
  return (
    <div 
      className="contenedor-error">
        <h1>Gracias, vuelve pronto!!!</h1>
        <button
          onClick={() => { 
            setIsSuccess(false)
            setIsProduct(true)
            //window.location.href = "http://localhost:5173/";
          }}
        >Volver a la pagina principal</button>
    </div>
  )
}
export default Success;