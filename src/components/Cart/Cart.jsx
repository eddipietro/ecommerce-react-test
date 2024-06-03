import React, { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";
import Venta from "../Venta/Venta";

const Cart = () => {
  const { productsCart, totalProducts, clearCart } = useContext(cartContext);
  const [buyFinalized, setBuyFinalized] = useState(false);

  const finishBuy = () => {
    // Simulamos un tiempo de carga de 3 segundos antes de mostrar el gif
    setTimeout(() => {
      setBuyFinalized(true);
    }, 0);
  };

  if (productsCart.length === 0) {
    return (
      <div className="container">
        <div className="titulo-text">
          Tu Carrito está vacío
          <Link to="/">
            <button className="btn btn-dark">Iniciar la Compra</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Tu Carrito de Compras: </h2>
      <div className="container-product">
        <div className="row">
          {productsCart.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </div>
        <div className="cart-element">
          <p className="total-text">Total: ${totalProducts}</p>
        </div>
        <div className="cart-element">
          <button onClick={() => clearCart()} className="btn btn-dark">
            Vaciar Carrito
          </button>
        </div>
        <div>
          {buyFinalized ? (
            <>
              {/* <img src="osito-matero.gif" className="gif" alt="Cargando" /> */}
              <Venta />
            </>
          ) : (
            <div className="cart-element">
              <button onClick={finishBuy} className="btn btn-dark">
                Finalizar la Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;