import logo from './logo.svg';
import './App.css';
import { LoginForm } from './components/Login/LoginForm';
import { RegistroUsuario } from './components/RegistroUsuarios/RegistroUsuario';
import { RegistroComprador } from './components/RegistroUsuarios/RegistroComprador';
import { RegistroDelivery } from './components/RegistroUsuarios/RegistroDelivery';
import { RegistroComunidad } from './components/RegistroUsuarios/RegistroComunidad';
import { FormComunidad } from './components/Formularios/FormComunidad';
import FormDelivery from './components/Formularios/FormDelivery';
import FormArtesano from './components/Formularios/FormArtesano';


function App() {
  return (
    <div>
      {/* <LoginForm/>  */}
      {/* <RegistroUsuario/>   */}
      {/* <RegistroComprador/> */}
      {/* <RegistroDelivery/> */}
      {/* <RegistroComunidad/>  */}
      {/* <FormComunidad/>   */}
      {/* <FormDelivery/>  */}
       <FormArtesano/>  

    </div>
  );
}

export default App;
