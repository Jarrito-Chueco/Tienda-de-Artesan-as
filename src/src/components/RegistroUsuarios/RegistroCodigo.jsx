import React, { useEffect, useState } from 'react';
import './RegistroComprador.css';
import { FaKey } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

export const RegistroCodigo = () => {
    const navigate = useNavigate(); 
    const [codigo, setCodigo] = useState('');
    const userId = localStorage.getItem('id'); // Obtener el ID del usuario desde el localStorage

    useEffect(() => {
        document.body.classList.add('registro-body');
        return () => {
            document.body.classList.remove('registro-body');
        };
    }, []);

    const handleCodigoChange = (event) => {
        setCodigo(event.target.value);
    };

    const handleValidarCuentaClick = async () => {
        try {
            const response = await fetch('http://localhost/proyecto/src/components/control/control_codigo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'codigo': codigo
                })
            });
    
            const result = await response.json();
    
            // Manejar el caso de éxito y redirigir
            if (result.status === 'success') {
                console.log('UserID antes de redirigir a FormComunidad:', result.userId); // Mostrar el userId en la consola
                if (result.tipo === 'comunidad') {
                    navigate('/FormComunidad', { state: { userId: result.userId } });
                } else if (result.tipo === 'delivery') {
                    navigate('/FormDelivery', { state: { userId: result.userId } });
                } else if (result.tipo === 'comprador') {
                    navigate('/home', { state: { userId: result.userId } });
                }
            } else {
                console.error(result.message); // Mostrar error si el código no es válido
            }
    
        } catch (error) {
            console.error('Error al validar la cuenta:', error);
        }
    };
    

    return (
        <div className='registro-wrapper'>
            <form>
                <h1>Ingrese el código de confirmación de cuenta</h1>

                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Código'
                        value={codigo}
                        onChange={handleCodigoChange}
                        required
                    />
                    <FaKey className='icon' />
                </div>

                <button type='button' onClick={handleValidarCuentaClick}>Validar cuenta</button>
            </form>
        </div>
    );
};
