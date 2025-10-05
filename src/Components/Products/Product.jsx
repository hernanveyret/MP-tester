import React, { useState, useEffect, useRef } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios'
import './product.css'

const Product = () => {
  const [ preferenceId, setPreferenceId ] = useState(null);
  const [ carrito, setCarrito ] = useState([]);
  const miRefScroll = useRef();
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;

  const productos = [
    {
      id: 1,
      title: 'Remera reflex Huntrix',
      unit_price: 20,
      quantity: 1
    },
    {
      id: 2,
      title: 'Remera reflex Roblox',
      unit_price: 10,
      quantity: 1
    }
  ]
  
  // Inicializa Mercado Pago con tu Public Key
  initMercadoPago(publicKey, {
    locale: 'es-AR' // para que quede en español argentino
  });

  const createPreference = async () => {
    //console.log('click 2')
    //console.log(typeof carrito[0].unit_price, carrito[0].unit_price)
    try {
      const response = await axios.post('https://mp-server-tester.onrender.com/create_preference', {
      items: carrito.length > 0 && carrito
        
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    //console.log('click')
    const id = await createPreference();
    if(id){
      setPreferenceId(id)
    }
  }

  const addCarrito = (id) => {    
    const filtro = productos.find(pro => pro.id === id)
    //console.log(filtro)
    if(id){
      setCarrito((prevCarrito) => [ ...prevCarrito, filtro ])
    }
  }

 const manejarScrollArriba = () => {
    miRefScroll.current?.scrollIntoView({behavior:'smooth'})
  }

  return (
    <div className='contenedor-card'>
      <h1 ref={miRefScroll}>PRODUCTOS</h1>
      <div className='card-product'>
        <div className='card'>
          <img src="./img/remera1.jpg" alt="imagen remera" />
          <h3>Remera reflex Huntrix</h3>
          <p>$ 20</p>
          <button
            className='btn-producto'
            onClick={() => { addCarrito(1)}}
          >Agregar Al Carrito</button>          
        </div>
      </div>

      <div className='card-product'>
        <div className='card'>
          <img src="./img/remera4.jpg" alt="imagen remera" />
          <h3>Remera reflex Roblox</h3>
          <p>$ 10</p>
          <button
          className='btn-producto'        
            onClick={() => { addCarrito(2)}}
          >Agregar Al Carrito</button>          
        </div>
      </div>
          
          {
            carrito.length > 0 &&
            <div className='card'>
              <h3>Tus Productos</h3>
              
                {
                  carrito.map((p,i) => (
                    <div key={i} className="card-carrito">
                      <p>{p.title}</p>
                      <div className="precio-carrito">
                        <p>Cant: {p.quantity}</p>
                        <p>{p.unit_price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                      </div>
                    </div>
                  ))
                }
                <button
                  className='btn-carrito'
                  onClick={handleBuy}
                >PAGAR</button>
          {
            preferenceId && 
            <Wallet initialization={{ preferenceId: preferenceId }} />
          }
              
            </div>
          }
          <button
            className='btn-up'
            onClick={manejarScrollArriba}
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#eee">
              <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
            </svg>
          </button>
    </div>
  )
 }
 export default Product;