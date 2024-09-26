import React, { useState, useEffect } from 'react';
import './RegistroUsuario.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir a rutas

export const RegistroUsuario = () => {
  const navigate = useNavigate(); // Hook para redirigir programáticamente


  useEffect(() => {
    // Agregar la clase login-body al cargar el componente
    document.body.classList.add('comunidad-body');
    
    return () => {
      // Limpiar la clase cuando el componente se desmonte
      document.body.classList.remove('comunidad-body');
    };
}, []);


  const handleComunidadClick = () => {
    navigate('/registrocomunidad');
  };

  const handleDeliveryClick = () => {
    navigate('/registrodelivery');
  };

  const handleClienteClick = () => {
    navigate('/registrocomprador');
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirige al LoginForm
  };

  return (
    <div className='comunidad-wrapper'>
      <form>
        <h1>¿Quieres Registrarte Como?</h1>

        <button type='button' onClick={handleComunidadClick}>Comunidad</button>
        <button type='button' onClick={handleDeliveryClick}>Delivery</button>
        <button type='button' onClick={handleClienteClick}>Cliente</button>

        <div className='comunidad-register-link'>      
            <a href='#' onClick={handleLoginClick}><IoMdArrowRoundBack className='comunidad-icon'/></a>
        </div>
      </form>
    </div>
  );
};