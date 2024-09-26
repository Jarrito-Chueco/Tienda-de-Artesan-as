import React from 'react';


const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>Has iniciado sesión o te has registrado con éxito.</p>
      <button onClick={() => window.location.href = '/perfil'}>
        Ir a tu Perfil
      </button>
      <button onClick={() => window.location.href = '/productos'}>
        Ver Productos
      </button>
      <button onClick={() => window.location.href = '/logout'}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
