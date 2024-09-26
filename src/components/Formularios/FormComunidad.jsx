import React, { useState } from 'react';
import logo from '../Assets/logo.jpeg'; 
import styles from './FormComunidad.module.css';
import { useForm } from 'react-hook-form';

export const FormComunidad = () => {
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
      <h2 className={styles.titleCentered}>Formulario Comunidad</h2>

      <div className="contenedor">
        <img src={logo} alt="Logo" className={styles.logo} /> 
      </div>
      
      <h1 className={styles.sectionTitle}>Información Comunidad</h1>

        <div>
          <label className={styles.label}>Nombre Comunidad</label>
          <input
            type="text"
            {...register("nombreComunidad", {
              required: "Ingresa el nombre de tu Comunidad",
            })}
            aria-invalid={errors.nombreComunidad ? "true" : "false"}
            placeholder={errors.nombreComunidad ? errors.nombreComunidad.message : "Ingresa el nombre de la comunidad"}
            className={errors.nombreComunidad ? styles.errorInput : ""}
          />
        </div>

        <div>
          <label className={styles.label}>Describe a tu comunidad y por qué quieres mostrarnos sus productos</label>
          <textarea
            {...register("descripcion", {
              required: "Este campo es obligatorio",
              validate: value => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 50 || "No puedes ingresar más de 50 palabras";
              }
            })}
            aria-invalid={errors.descripcion ? "true" : "false"}
            placeholder={errors.descripcion ? errors.descripcion.message : "Describe tu comunidad..."}
            className={errors.descripcion ? styles.errorTextarea : ""}
          />
        </div>

        <div>
          <label className={styles.label}>Ubicación</label>
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
          <label className={styles.label}>Ciudad</label>
          <select {...register("ciudad")} className={styles.selectInput}>
            <option value="La Paz">La Paz</option>
            <option value="Oruro">Oruro</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="Sucre">Sucre</option>
            <option value="Potosí">Potosí</option>
            <option value="Beni">Beni</option>
            <option value="Pando">Pando</option>
            <option value="Tarija">Tarija</option>
            <option value="Cobija">Cobija</option>
          </select>
        </div>

        <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="foto">Agrega una Foto de tu Comunidad</label>
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

        <h1 className={styles.sectionTitle}>Información Responsable Comunidad</h1>

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
      
        <input type="submit" value="Enviar" className={styles.submitButton} />

      </form>
    </div>
  );
}

export default FormComunidad;





