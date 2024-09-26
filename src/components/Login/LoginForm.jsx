import React from 'react';
import './LoginForm.css';
import { FaUserAlt, FaLock } from "react-icons/fa";

export const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Inicia Sesión</h1>

            <div className='input-box'>
                <input type="text" placeholder='Nombre' required/>
                <FaUserAlt className='icon'/>
            </div>

            <div className='input-box'>
                <input type="Contraseña" placeholder='Contraseña' required/>
                <FaLock className='icon'/>
            </div>

            <div className='remember-forgot'>
                <label><input type="checkbox" />Recordar Contraseña</label>
                <a href='#'>Olvido su Contraseña?</a>
            </div>

            <button type='submit'>Inicia Sesión</button>

            <div className='register-link'>
                <p>No estas Registrado?<a href='#'>Registrate</a></p>

            </div>


        </form>

    </div>
  )
}
