import React, { useState, useEffect, useRef } from 'react';
import './RegistroComprador.css';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const RegistroDelivery  = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    // Crear referencias para los inputs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nombreRef = useRef(null);
    const apellidoRef = useRef(null);

    useEffect(() => {
        document.body.classList.add('registro-body');

        return () => {
            document.body.classList.remove('registro-body');
        };
    }, []);

    const handleLoginClick = async (e) => {
        e.preventDefault();
    
        // Validación de campos vacíos
        let valid = true;

        // Validar nombre
        if (!nombre) {
            nombreRef.current.setCustomValidity('Por favor, rellena este campo.');
            nombreRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            nombreRef.current.setCustomValidity('');
        }

        // Validar apellido
        if (!apellido) {
            apellidoRef.current.setCustomValidity('Por favor, rellena este campo.');
            apellidoRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            apellidoRef.current.setCustomValidity('');
        }

        // Validar correo
        if (!email) {
            emailRef.current.setCustomValidity('Por favor, rellena este campo.');
            emailRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            emailRef.current.setCustomValidity('');
        }
    
        // Validar contraseña
        if (!password) {
            passwordRef.current.setCustomValidity('Por favor, rellena este campo.');
            passwordRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else if (!validatePassword(password)) {
            passwordRef.current.setCustomValidity('La contraseña debe tener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y símbolos.');
            passwordRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            passwordRef.current.setCustomValidity('');
        }

        // Validar confirmar contraseña
        if (password !== confirmPassword) {
            confirmPasswordRef.current.setCustomValidity('Las contraseñas no coinciden.');
            confirmPasswordRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            confirmPasswordRef.current.setCustomValidity('');
        }

        // Si todos los campos son válidos, enviar la solicitud
        if (valid) {
            try {
                const response = await fetch('http://localhost/proyecto/src/Components/control/control_Rdelivery.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: nombre, apellido: apellido, correo: email, contrasena: password }),
                });

                const data = await response.json();
                if (data.success) {
                    navigate('/registrocodigo');
                } else {
                    // Mostrar mensaje de error en el campo de contraseña si la autenticación falla
                    passwordRef.current.setCustomValidity(data.message);
                    passwordRef.current.reportValidity();
                }
            } catch (error) {
                console.error('Error:', error);
                passwordRef.current.setCustomValidity('Hubo un problema al intentar iniciar sesión.');
                passwordRef.current.reportValidity();
            }
        }
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);
        return password.length >= minLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className='registro-wrapper'>
            <form action="">
                <h1>Registro Delivery</h1>

                <div className='input-box'>
                    <input 
                        type="text" 
                        placeholder='Nombre' 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        ref={nombreRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaUserAlt className='icon'/>
                </div>

                <div className='input-box'>
                    <input 
                        type="text" 
                        placeholder='Apellido' 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)} 
                        ref={apellidoRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaUserAlt className='icon'/>
                </div>

                <div className='input-box'>
                    <input 
                        type="email" 
                        placeholder='Correo' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        ref={emailRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <MdEmail className='icon'/>
                </div>

                <div className='input-box'>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder='Contraseña' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        ref={passwordRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaLock className='icon'/>
                    {showPassword ? 
                        <FaEyeSlash className='iconeye' onClick={togglePasswordVisibility} /> 
                        : 
                        <FaEye className='iconeye' onClick={togglePasswordVisibility} />
                    }
                </div>

                <div className='input-box'>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder='Confirmar Contraseña' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        ref={confirmPasswordRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaLock className='icon'/>
                    {showConfirmPassword ? 
                        <FaEyeSlash className='iconeye' onClick={toggleConfirmPasswordVisibility} /> 
                        : 
                        <FaEye className='iconeye' onClick={toggleConfirmPasswordVisibility} />
                    }
                </div>
                <button type='submit' onClick={handleLoginClick}>Registrarse</button>
                
                <div className='register-link'>
                    <a href='#' onClick={() => navigate('/registrousuario')}>
                        <IoMdArrowRoundBack className='icon' />
                    </a>
                </div>

            </form>
        </div>
    );
}
