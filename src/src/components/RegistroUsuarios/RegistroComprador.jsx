import React, { useState, useEffect, useRef } from 'react';
import './RegistroComprador.css'; // Asegúrate de que el nombre del archivo CSS sea correcto
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaPhone, FaIdCard, FaBirthdayCake } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const RegistroComprador = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [ci, setCi] = useState('');

    // Crear referencias para los inputs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nombreRef = useRef(null);
    const apellidoRef = useRef(null);
    const telefonoRef = useRef(null);
    const edadRef = useRef(null);
    const ciRef = useRef(null);

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

        // Validar teléfono
        if (!telefono) {
            telefonoRef.current.setCustomValidity('Por favor, rellena este campo.');
            telefonoRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            telefonoRef.current.setCustomValidity('');
        }

        // Validar edad
        if (!edad) {
            edadRef.current.setCustomValidity('Por favor, rellena este campo.');
            edadRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            edadRef.current.setCustomValidity('');
        }

        // Validar CI
        if (!ci) {
            ciRef.current.setCustomValidity('Por favor, rellena este campo.');
            ciRef.current.reportValidity(); // Mostrar mensaje de error
            valid = false;
        } else {
            ciRef.current.setCustomValidity('');
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
                const response = await fetch('http://localhost/proyecto/src/Components/control/control_Rcomprador.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        nombre: nombre, 
                        apellido: apellido, 
                        correo: email, 
                        contrasena: password, 
                        telefono: telefono,
                        edad: edad,
                        ci: ci,
                    }),
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
                <h1>Registro Cliente</h1>

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
                        type="text" 
                        placeholder='CI' 
                        value={ci} 
                        onChange={(e) => setCi(e.target.value)} 
                        ref={ciRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaIdCard className='icon'/>
                </div>

                <div className='input-box'>
                    <input 
                        type="text" 
                        placeholder='Teléfono' 
                        value={telefono} 
                        onChange={(e) => setTelefono(e.target.value)} 
                        ref={telefonoRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaPhone className='icon'/>
                </div>

                <div className='input-box'>
                    <input 
                        type="number" 
                        placeholder='Edad' 
                        value={edad} 
                        onChange={(e) => setEdad(e.target.value)} 
                        ref={edadRef} 
                        required 
                        onInput={(e) => e.target.setCustomValidity('')} 
                    />
                    <FaBirthdayCake className='icon'/>
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
