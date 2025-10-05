import React from "react";
import './error.css';

const Success = () => {
  return (
    <div 
      className="contenedor-error">
        <h1>Gracias, vuelve pronto!!!</h1>
        <button
          onClick={() => { 
            window.location.href = "http://localhost:5173/";
          }}
        >Volver a la pagina principal</button>
    </div>
  )
}
export default Success;