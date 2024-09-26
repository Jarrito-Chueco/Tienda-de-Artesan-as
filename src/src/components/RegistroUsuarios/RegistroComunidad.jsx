import React, { useState, useEffect, useRef } from 'react';
import './RegistroComprador.css';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const RegistroComunidad = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [nombreComunidad, setNombreComunidad] = useState('');
    const [nombreResponsable, setNombreResponsable] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    useEffect(() => {
        document.body.classList.add('registro-body');
        return () => {
            document.body.classList.remove('registro-body');
        };
    }, []);

    // Toggle visibility for password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle visibility for confirm password
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          nombreComunidad,
          nombreResponsable,
          email,
          password,
        };
      
        try {
          const response = await fetch('http://localhost/proyecto/src/components/control/control_Rcomunidad.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log('Resultado:', result);
      
          if (result.status === 'success') {
            // Redirigir si todo está bien
            navigate('/registrocodigo');
          } else {
            // Manejar el error en el frontend
            console.error('Error en el registro:', result.message);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
      
    return (
        <div className='registro-wrapper'>
            <form onSubmit={handleFormSubmit}>
                <h1>Registro Comunidad</h1>

                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Nombre Comunidad'
                        value={nombreComunidad}
                        onChange={(e) => setNombreComunidad(e.target.value)}
                        required
                    />
                    <RiRoadMapFill className='icon' />
                </div>

                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Nombre Responsable de la Comunidad'
                        value={nombreResponsable}
                        onChange={(e) => setNombreResponsable(e.target.value)}
                        required
                    />
                    <FaUserAlt className='icon' />
                </div>

                <div className='input-box'>
                    <input
                        type="email"
                        placeholder='Correo: ejemplo@.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <MdEmail className='icon' />
                </div>

                {/* Password Field */}
                <div className='input-box'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        ref={passwordRef}
                        onInput={() => passwordRef.current.setCustomValidity('')} // Clear the error
                    />
                    <FaLock className='icon' />
                    {showPassword ? (
                        <FaEyeSlash className='iconeye' onClick={togglePasswordVisibility} />
                    ) : (
                        <FaEye className='iconeye' onClick={togglePasswordVisibility} />
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className='input-box'>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Contraseña de Confirmación'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        ref={confirmPasswordRef}
                        onInput={() => confirmPasswordRef.current.setCustomValidity('')} // Clear the error
                    />
                    <FaLock className='icon' />
                    {showConfirmPassword ? (
                        <FaEyeSlash className='iconeye' onClick={toggleConfirmPasswordVisibility} />
                    ) : (
                        <FaEye className='iconeye' onClick={toggleConfirmPasswordVisibility} />
                    )}
                </div>

                <button type='submit'>Registrarse</button>

                <div className='register-link'>
                    <a href='#' onClick={() => navigate('/registrousuario')}>
                        <IoMdArrowRoundBack className='icon' />
                    </a>
                </div>
            </form>
        </div>
    );
};
