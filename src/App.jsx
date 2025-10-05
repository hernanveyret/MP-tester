import { useState, useEffect } from 'react'

import './App.css'
import Product from './Components/Products/Product'
import Error from './Components/Error';
import Success from './Components/Success';;

function App() {
  const [ isProduct, setIsProduct ] = useState(true)
  const [ isError, setIsError ] = useState(false)
  const [ isSucces, setIsSuccess ] = useState(false);

  // Muestra un producto si llega en la url
useEffect(() => {
  const path = window.location.pathname;
  if(path === '/error'){
    setIsProduct(false)
    setIsError(true)
  }else if(path === '/success'){
    setIsProduct(false)
    setIsSuccess(true)
  }
}, []); //  cuando se cargan los productos, se ejecuta

  return (
    <>
    {
      isProduct &&
        <Product />
    }
    {
      isError &&
        <Error />
    }
    {
      isSucces &&
        <Success />
    }
    </>
  )
}

export default App
