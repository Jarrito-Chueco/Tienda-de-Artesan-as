import React from 'react';
import './RegistroComprador.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail} from "react-icons/md";
import { FaEye} from "react-icons/fa";
import { RiRoadMapFill } from "react-icons/ri";

export const RegistroComunidad= () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Registro Comunidad</h1>

            <div className='input-box'>
                <input type="text" placeholder='Nombre Comunidad' required/>
                <RiRoadMapFill className='icon'/>
            </div>
            <div className='input-box'>
                <input type="text" placeholder='Nombre Responsable de la Comunidad' required/>
                <FaUserAlt className='icon'/>
            </div>

            <div className='input-box'>
                <input type="text" placeholder='Correo: ejemplo@.com' required/>
                <MdEmail className='icon'/>
            </div>

            <div className='input-box'>
                <input type="Contraseña" placeholder='Contraseña' required/>
                <FaEye className='iconeye'/>
                <FaLock className='icon'/>
            </div>

            <div className='input-box'>
                <input type="Contraseña" placeholder='Contraseña de Confirmación' required/>
                <FaEye className='iconeye'/>
                <FaLock className='icon'/>
            </div>


            <button type='submit'>Registrarse</button>

    
        </form>

    </div>
  )
}