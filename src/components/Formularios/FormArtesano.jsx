import React, { useState } from 'react';
import logo from '../Assets/logo.jpeg'; 
import styles from './FormComunidad.module.css';
import { useForm } from 'react-hook-form';

export const FormArtesano= () => {
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
      <h2 className={styles.titleCentered}>Formulario Artesano</h2>

      <div className="contenedor">
        <img src={logo} alt="Logo" className={styles.logo} /> 
      </div>
      
      <h1 className={styles.sectionTitle}>Datos Personales</h1>

      <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="foto">Agrega una Foto de Artesano</label>
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

      <div>
          <label className={styles.label}>Nombre Completo</label>

          <input
            type="text"
            {...register("nombreArtesano", {
              required: "Este campo es obligatorio",
              validate: value => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount >= 3 || "Debe ingresar un nombre y dos apellidos";
              }
            })}
            aria-invalid={errors.nombreArtesano ? "true" : "false"}
            placeholder={errors.nombreArtesano ? errors.nombreEncargado.message : "Ingresa tu nombre completo"}
            className={errors.nombreArtesano ? styles.errorInput : ""}
          />
          {errors.nombreEncargado && <p className={styles.errorMessage}>{errors.nombreEncargado.message}</p>}
        </div>
        
        
        <h1 className={styles.sectionTitle}>Agregar Productos</h1>

        <div>
          <label className={styles.label}>Nombre Producto</label>
          <input
            type="text"
            {...register("nombreProducto", {
              required: "Ingresa el nombre del producto",
            })}
            aria-invalid={errors.nombreProducto ? "true" : "false"}
            placeholder={errors.nombreProducto ? errors.nombreComunidad.message : "Ingresa el nombre del producto"}
            className={errors.nombreProducto ? styles.errorInput : ""}
          />
        </div>

        <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="foto">Agrega una Foto de Producto</label>
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
      
        <div>
          <label className={styles.label}>Precio Producto</label>
          <input
            type="text"
            {...register("precioProducto", {
              required: "Ingresa el nombre del Producto",
            })}
            aria-invalid={errors.precioProducto ? "true" : "false"}
            placeholder={errors.precioProducto ? errors.nombreComunidad.message : "Ingresa el precio del producto"}
            className={errors.precioProducto? styles.errorInput : ""}
          />
        </div>
        <div>
          <label className={styles.label}>Describe los materiales del producto</label>
          <textarea
            {...register("descripcion", {
              required: "Este campo es obligatorio",
              validate: value => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 50 || "No puedes ingresar más de 50 palabras";
              }
            })}
            aria-invalid={errors.descripcion ? "true" : "false"}
            placeholder={errors.descripcion ? errors.descripcion.message : "Materiales de elavoracion del producto"}
            className={errors.descripcion ? styles.errorTextarea : ""}
          />
        </div>

     


      

        
        <input type="submit" value="Agregar Producto" className={styles.submitButton} />
      
        <input type="submit" value="Enviar" className={styles.submitButton} />

      </form>
    </div>
  );
}

export default FormArtesano;





