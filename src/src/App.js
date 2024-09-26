import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/Login/LoginForm'; 
import  Home  from './components/Login/home'; 

import { RegistroUsuario } from './components/RegistroUsuarios/RegistroUsuario';
import { RegistroComunidad } from './components/RegistroUsuarios/RegistroComunidad';
import { RegistroDelivery } from './components/RegistroUsuarios/RegistroDelivery';
import { RegistroComprador } from './components/RegistroUsuarios/RegistroComprador';
import { RegistroCodigo } from './components/RegistroUsuarios/RegistroCodigo';

import { FormComunidad } from './components/Formularios/FormComunidad'; 
import { FormDelivery } from './components/Formularios/FormDelivery'; 
import { FormArtesano } from './components/Formularios/FormArtesano'; 


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/registrocodigo" element={<RegistroCodigo />} /> 
      <Route path="/" element={<LoginForm />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/home" element={<Home/>} /> 
        <Route path="/registrousuario" element={<RegistroUsuario />} />
        <Route path="/registrocomprador" element={<RegistroComprador />} />
        <Route path="/registrocomunidad" element={<RegistroComunidad />} />       
        <Route path="/registrodelivery" element={<RegistroDelivery />} />      
        <Route path="/FormComunidad" element={<FormComunidad />} />
           
        <Route path="/formdelivery" element={<FormDelivery />} /> 
        <Route path="/formartesano" element={<FormArtesano />} /> 
      </Routes>
    </Router>
  );
}

export default App;
