import React, { useState, useEffect, useCallback, useRef } from "react";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import "./Venta.css";

const Venta = () => {
  const { productsCart, totalProducts, clearCart } = useContext(cartContext);
  const [idVenta, setIdVenta] = useState("");
  const navigate = useNavigate();
  const initialStateValues = {
    nombre: "",
    apellido: "",
    email: "",
    whatsApp: "",
  };

  const [values, setValues] = useState(initialStateValues);
  const form = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const datosComprador = values;

  const finalizarVenta = () => {
    const ventasCollection = collection(db, "ventas");
    addDoc(ventasCollection, {
      datosComprador,
      items: productsCart.map((product) => ({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      })),
      fecha: serverTimestamp(),
      total: totalProducts,
    }).then((result) => {
      setIdVenta(result.id);
    });

    productsCart.forEach((product) => {
      const updateCollection = doc(db, "productos", product.id);
      updateDoc(updateCollection, { stock: product.stock - product.cantidad });
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_g4g8vmj', 'template_d7xx9o4', form.current, 'YZK8Cq2BEe9Ti2lhn')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );

    finalizarVenta();
  };

  const buySend = useCallback(() => {
    Swal.fire({
      icon: "success",
      title: "Confirmación",
      confirmButtonColor: "#BB1111",
      html: `<p>Recibimos correctamente tu compra, en breve nos comunicaremos para acordar pago y entrega, el identificador de la compra es:<p>${idVenta}`,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        return navigate("/");
      }
    });
  }, [idVenta, clearCart, navigate]);

  useEffect(() => {
    if (idVenta) {
      buySend();
    }
  }, [idVenta, buySend]);

  return (
    <form ref={form} className="formulario" onSubmit={sendEmail}>
      <div className="titulo-text">Ingresá tus Datos</div>
      <input
        type="text"
        className="Input"
        placeholder="Ingrese Nombre"
        name="nombre"
        value={values.nombre}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        className="Input"
        placeholder="Ingrese Apellido"
        name="apellido"
        value={values.apellido}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        className="Input"
        placeholder="Ingrese Email"
        name="email"
        value={values.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        className="Input"
        placeholder="Ingrese WhatsApp"
        name="whatsApp"
        value={values.whatsApp}
        onChange={handleInputChange}
        required
      />
      <textarea name="message" value={`Compra realizada por: \n  Nombre: ${values.nombre} \n Apellido: ${values.apellido} \n  Email: ${values.email}  \n WhatsApp: ${values.whatsApp}`} hidden readOnly />
      <button className="btn btn-dark formSubmit">Enviar Compra</button>
    </form>
  );
};

export default Venta;
