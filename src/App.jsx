import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_CART_QUANTITY = 5
  const MIN_CART_QUANTITY = 1


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {

    const itemExists = cart.findIndex( cartItem => cartItem.id === item.id)

    if(itemExists !== -1) {
      if(cart[itemExists].quantity >= MAX_CART_QUANTITY) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

  }

  function removeFromCart(id) {
    setCart( prevCart => prevCart.filter( cartItem => cartItem.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  function decrementQuantity(id) {
    setCart(
      prevCart =>
        prevCart.map(item => item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, MIN_CART_QUANTITY) } : item)
    );
  }

  function incrementQuantity(id) {
    setCart(
      prevCart =>
        prevCart.map(item => item.id === id && item.quantity < MAX_CART_QUANTITY ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }



  return (
    <>

    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
      decrementQuantity={decrementQuantity}
      incrementQuantity={incrementQuantity}
    />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map( guitar => (
            <Guitar 
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
           
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
