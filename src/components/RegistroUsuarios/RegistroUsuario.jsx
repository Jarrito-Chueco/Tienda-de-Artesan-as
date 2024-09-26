import React from 'react';

import './RegistroUsuario.css';
import { FaUserAlt, FaLock,} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import { RegistroComprador } from './RegistroComprador';

export const RegistroUsuario = () => {
  
  return (
    
    <div className='wrapper'>
        <form action="">
            <h1>Quieres Registrarte Como?</h1>

            <button type='submit'>Comunidad</button>
            <button type='submit'>Delivery</button>
            <button type='submit'>Cliente</button>

            <div className='register-link'>
                <a href='#'><IoMdArrowRoundBack className='icon'/></a>
            
            </div>


        </form>

    </div>
  )
}
