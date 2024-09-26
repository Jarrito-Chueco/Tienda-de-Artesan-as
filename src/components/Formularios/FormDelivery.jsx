import React, { useState } from 'react';
import logo from '../Assets/logo.jpeg'; 
import styles from './FormComunidad.module.css';
import { useForm } from 'react-hook-form';

export const FormDelivery = () => {
  const [image, setImage] = useState(null); 
  const [dragActive, setDragActive] = useState(false); 

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  
    reset();
    setImage(null); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true); 
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files; 
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0])); 
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0])); 
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}> 
      <h2 className={styles.titleCentered}>Formulario Delivery</h2>

      <div className="contenedor">
        <img src={logo} alt="Logo" className={styles.logo} /> 
      </div>
      
      <h1 className={styles.sectionTitle}>Datos Personales</h1>


      <div>
          <label className={styles.label}>Nombre Completo</label>

          <input
            type="text"
            {...register("nombreEncargado", {
              required: "Este campo es obligatorio",
              validate: value => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount >= 3 || "Debe ingresar un nombre y dos apellidos";
              }
            })}
            aria-invalid={errors.nombreEncargado ? "true" : "false"}
            placeholder={errors.nombreEncargado ? errors.nombreEncargado.message : "Ingresa tu nombre completo"}
            className={errors.nombreEncargado ? styles.errorInput : ""}
          />
          {errors.nombreEncargado && <p className={styles.errorMessage}>{errors.nombreEncargado.message}</p>}
        </div>
        
        <div>
          <label className={styles.label}>Correo</label>
          <input
            type="text"
            {...register("correoEncargado", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: "No es un correo válido",
              }
            })}
            aria-invalid={errors.correoEncargado ? "true" : "false"}
            placeholder={errors.correoEncargado ? errors.correoEncargado.message : "Ingresa tu correo electrónico"}
            className={errors.correoEncargado ? styles.errorInput : ""}
          />
          {errors.correoEncargado && <p className={styles.errorMessage}>{errors.correoEncargado.message}</p>}
        </div>

        <div>
          <label className={styles.label}>Teléfono</label>
          <input
            type="text"
            {...register('telefonoEncargado', {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^\d{8}$/,
                message: "El teléfono debe tener exactamente 8 dígitos",
              }
            })}
            aria-invalid={errors.telefonoEncargado ? "true" : "false"}
            placeholder={errors.telefonoEncargado ? errors.telefonoEncargado.message : "Ingresa tu teléfono"}
            className={errors.telefonoEncargado ? styles.errorInput : ""}
          />
          {errors.telefonoEncargado && <p className={styles.errorMessage}>{errors.telefonoEncargado.message}</p>}
        </div>

        <div>
          <label className={styles.label}>Edad</label>
          <input
            type="text"
            {...register("edadEncargado", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.edadEncargado ? "true" : "false"}
            placeholder={errors.edadEncargado ? errors.edadEncargado.message : "Ingresa tu edad"}
            className={errors.edadEncargado ? styles.errorInput : ""}
          />
        </div>

        <div>
          <label className={styles.label}>Carnet de Identidad</label>
          <input
            type="text"
            {...register("ci", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.ci ? "true" : "false"}
            placeholder={errors.ci? errors.edadEncargado.message : "Ingresa tu ci"}
            className={errors.ci ? styles.errorInput : ""}
          />
        </div>

        <div>
          <label className={styles.label}>Agrega tu Direccion Actual</label>
          <input
            type="text"
            {...register("ubicacion", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.ubicacion ? "true" : "false"}
            placeholder={errors.ubicacion ? errors.ubicacion.message : "Ingresa la ubicación"}
            className={errors.ubicacion ? styles.errorInput : ""}
          />
        </div>

        <div>
          <label className={styles.label}>Escoge un horario</label>
          <select {...register("ciudad")} className={styles.selectInput}>
            <option value="manana">Turno Mañana (8:00 a 12:00 am.)</option>
            <option value="tarde">Turno Tarde-Noche (13:00 a 20:00 pm.)</option>
          </select>
        </div>

        <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="foto">Agrega una Foto de tu Carnet</label>
          <div
            className={`${styles.dragDropBox} ${dragActive ? styles.active : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('foto').click()} 
          >
            <input
              type="file"
              id="foto"
              {...register("foto")}
              onChange={handleChange}
              style={{ display: 'none' }} 
            />
            <p>Arrastra y suelta tu imagen aquí, o haz clic para seleccionarla</p>
          </div>
          {image && <img src={image} alt="Vista previa" className={styles.previewImage} />}
        </div>
         
        <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="foto">Agrega una Foto de tu Licencia de Conducir</label>
          <div
            className={`${styles.dragDropBox} ${dragActive ? styles.active : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('foto').click()} 
          >
            <input
              type="file"
              id="foto"
              {...register("foto")}
              onChange={handleChange}
              style={{ display: 'none' }} 
            />
            <p>Arrastra y suelta tu imagen aquí, o haz clic para seleccionarla</p>
          </div>
          {image && <img src={image} alt="Vista previa" className={styles.previewImage} />}
        </div>
        
        <h1 className={styles.sectionTitle}>Informacion Vehiculo</h1>

        <div>
          <label className={styles.label}>Placa de tu Vehiculo</label>
          <input
            type="text"
            {...register("vehiculo", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.vehiuculo? "true" : "false"}
            placeholder={errors.vehiculo ? errors.ubicacion.message : "Ingresa la Placa"}
            className={errors.vehiculo ? styles.errorInput : ""}
          />
        </div>    

        <div>
          <label className={styles.label}>Propietario del Vehiculo</label>
          <input
            type="text"
            {...register("vehiculo", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.vehiuculo? "true" : "false"}
            placeholder={errors.vehiculo ? errors.ubicacion.message : "Ingresa la Placa"}
            className={errors.vehiculo ? styles.errorInput : ""}
          />
        </div> 

        <div>
          <label className={styles.label}>Estado del Vehiculo</label>
          <input
            type="text"
            {...register("Estadovehiculo", {
              required: {
                value: true,
                message: "Este Campo es Obligatorio",
              }
            })}
            aria-invalid={errors.Estadovehiuculo? "true" : "false"}
            placeholder={errors.Estadovehiculo ? errors.ubicacion.message : "Ingresa el estado del vehiculo"}
            className={errors.Estadovehiculo ? styles.errorInput : ""}
          />
        </div> 
       
      
        <input type="submit" value="Enviar" className={styles.submitButton} />

      </form>
    </div>
  );
}

export default FormDelivery;





