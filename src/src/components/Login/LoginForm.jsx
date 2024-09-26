import React, { useEffect, useState, useRef } from 'react';
import './LoginForm.css';
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(''); // Cambiar de username a email
    const [password, setPassword] = useState('');

    // Crear referencias para los inputs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        document.body.classList.add('login-body');

        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    const handleLoginClick = async (e) => {
        e.preventDefault();
    
        // Validación de campos vacíos
        let valid = true;
    
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
    
        // Si ambos campos son válidos, enviar la solicitud
        if (valid) {
            try {
                const response = await fetch('http://localhost/proyecto/src/Components/control/control_login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo: email, contrasena: password }), // Cambiar username a email
                });
    
                const data = await response.json();
                if (data.success) {
                    navigate('/home');
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

    return (
        <div className='login-wrapper'>
            <form action="">
                <h1>Inicia Sesión</h1>

                <div className='login-input-box'>
                    <input 
                        type="email" // Cambiar a tipo email
                        placeholder='Correo' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        ref={emailRef} // Asignar la referencia
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} // Restablecer el mensaje de error
                    />
                    <FaUserAlt className='login-icon'/>
                </div>

                <div className='login-input-box'>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder='Contraseña' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        ref={passwordRef} // Asignar la referencia
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} // Restablecer el mensaje de error
                    />
                    <FaLock className='login-icon'/>
                    {showPassword ? 
                        <FaEyeSlash className='iconeye' onClick={togglePasswordVisibility} /> 
                        : 
                        <FaEye className='iconeye' onClick={togglePasswordVisibility} />
                    }
                </div>

                <div className='login-remember-forgot'>
                    <label className="labelr">
                        <input type="checkbox" className="inputR" />
                        Recordar Contraseña
                    </label>
                    <a href='#'>¿Olvidó su Contraseña?</a>
                </div>

                <button type='submit' onClick={handleLoginClick}>Inicia Sesión</button>

                <div className='login-register-link'>
                    <p className="registerp">¿No estás Registrado?
                        <a className="registera" href='#' onClick={() => navigate('/registrousuario')}>Regístrate</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
