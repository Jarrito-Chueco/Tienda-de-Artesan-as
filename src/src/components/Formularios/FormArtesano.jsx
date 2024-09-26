import React, { useState } from 'react';
import logo from '../Assets/logo.jpeg'; 
import styles from './FormComunidad.module.css';
import { useForm } from 'react-hook-form';

export const FormArtesano = ({ idComunidad }) => {
  const [image, setImage] = useState(null); 
  const [dragActive, setDragActive] = useState(false); 

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log('ID Comunidad:', idComunidad);

    // Enviar todos los datos al archivo PHP
    const response = await fetch('http://localhost/proyecto/src/components/control/control_Fartesano.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        nombreArtesano: data.nombreArtesano,
        idComunidad: idComunidad,
        // Aquí puedes añadir el campo de foto si decides enviarlo
      }),
    });

    const result = await response.json();
    console.log(result);

    // Resetea el formulario y la imagen
    reset();
    setImage(null);
  };

  const onAddProduct = async (data) => {
    console.log('Agregar producto:', data);
    
    // Enviar solo los datos del producto al archivo PHP
    const response = await fetch('control_Fartesanos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        nombreProducto: data.nombreProducto,
        precioProducto: data.precioProducto,
        descripcion: data.descripcion,
        // Aquí deberías incluir el idArtesano obtenido tras el primer envío
      }),
    });

    const result = await response.json();
    console.log(result);

    // Resetea los campos de agregar producto
    reset({
      nombreArtesano: data.nombreArtesano // Mantén el nombre del artesano
    });
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
      <form onSubmit={handleSubmit(onAddProduct)}> 
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
            placeholder={errors.nombreArtesano ? errors.nombreArtesano.message : "Ingresa tu nombre completo"}
            className={errors.nombreArtesano ? styles.errorInput : ""}
          />
          {errors.nombreArtesano && <p className={styles.errorMessage}>{errors.nombreArtesano.message}</p>}
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
            placeholder={errors.nombreProducto ? errors.nombreProducto.message : "Ingresa el nombre del producto"}
            className={errors.nombreProducto ? styles.errorInput : ""}
          />
          {errors.nombreProducto && <p className={styles.errorMessage}>{errors.nombreProducto.message}</p>}
        </div>

        <div className={styles.dragDropContainer}>
          <label className={styles.label} htmlFor="fotoProducto">Agrega una Foto de Producto</label>
          <div
            className={`${styles.dragDropBox} ${dragActive ? styles.active : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fotoProducto').click()} 
          >
            <input
              type="file"
              id="fotoProducto"
              {...register("fotoProducto")}
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
              required: "Ingresa el precio del producto",
            })}
            aria-invalid={errors.precioProducto ? "true" : "false"}
            placeholder={errors.precioProducto ? errors.precioProducto.message : "Ingresa el precio del producto"}
            className={errors.precioProducto ? styles.errorInput : ""}
          />
          {errors.precioProducto && <p className={styles.errorMessage}>{errors.precioProducto.message}</p>}
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
            placeholder={errors.descripcion ? errors.descripcion.message : "Materiales de elaboración del producto"}
            className={errors.descripcion ? styles.errorTextarea : ""}
          />
          {errors.descripcion && <p className={styles.errorMessage}>{errors.descripcion.message}</p>}
        </div>

        <button type="button" onClick={handleSubmit(onAddProduct)} className={styles.submitButton}>
          Agregar Producto
        </button>
        <button type="button" onClick={handleSubmit(onSubmit)} className={styles.submitButton}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormArtesano;





