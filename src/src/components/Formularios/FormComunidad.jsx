import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.jpeg';
import styles from './FormComunidad.module.css';

export const FormComunidad = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para userId
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensaje de error
  const [idComunidad, setIdComunidad] = useState(null); // Estado para idComunidad

  useEffect(() => {
    const { userId: id } = location.state || {};
    if (id) {
      setUserId(id);
      fetchUserData(id);
    } else {
      setErrorMessage('No se ha recibido el ID del usuario.');
    }
  }, [location.state]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost/proyecto/src/components/control/control_Rcomunidad.php?userId=${id}`);
      const data = await response.json();

      if (data && !data.error) {
        setValue('nombreComunidad', data.nombreComunidad);
        setValue('nombreEncargado', data.nombreEncargado);
        setValue('correoEncargado', data.correoEncargado);
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  };

  const onSubmit = async (data, shouldAddArtisan = false) => {
    const formData = new FormData();
    formData.append('userId', userId); // Asegurarse que el userId se pase correctamente
    formData.append('nombreComunidad', data.nombreComunidad);
    formData.append('descripcion', data.descripcion);
    formData.append('ubicacion', data.ubicacion);
    formData.append('ciudad', data.ciudad);
  
    // Solo agregar la imagen si hay una seleccionada
    if (image) {  // Asegurarse de usar el estado de la imagen
      formData.append('foto', image);
    }
  
    formData.append('nombreEncargado', data.nombreEncargado);
    formData.append('correoEncargado', data.correoEncargado);
    formData.append('telefonoEncargado', data.telefonoEncargado);
    formData.append('edadEncargado', data.edadEncargado);
  
    try {
      const response = await fetch('http://localhost/proyecto/src/components/control/control_Fcomunidad.php', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.status === 'success') {
        setIdComunidad(result.idComunidad); // Almacenar el ID de la comunidad creada
        const destination = shouldAddArtisan ? '/FormArtesano' : '/home';
        navigate(destination, { state: { userId, idComunidad: result.idComunidad } }); // Pasar idComunidad al destino
      } else {
        console.error('Error al guardar los cambios:', result.message);
      }
  
      reset();
      setImage(null);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
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
      setImage(files[0]);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <h2 className={styles.titleCentered}>Formulario Comunidad</h2>

          <div className="contenedor">
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>

          <h1 className={styles.sectionTitle}>Información Comunidad</h1>

          <div>
            <label className={styles.label}>Nombre Comunidad</label>
            <input
              type="text"
              {...register("nombreComunidad", { required: "Ingresa el nombre de tu Comunidad" })}
              aria-invalid={errors.nombreComunidad ? "true" : "false"}
              placeholder="Ingresa el nombre de la comunidad"
              className={errors.nombreComunidad ? styles.errorInput : ""}
            />
          </div>

          <div>
            <label className={styles.label}>Describe a tu comunidad</label>
            <textarea
              {...register("descripcion", { required: "Este campo es obligatorio" })}
              aria-invalid={errors.descripcion ? "true" : "false"}
              placeholder="Describe tu comunidad..."
              className={errors.descripcion ? styles.errorTextarea : ""}
            />
          </div>

          <div>
            <label className={styles.label}>Ubicación</label>
            <input
              type="text"
              {...register("ubicacion", { required: "Este campo es obligatorio" })}
              aria-invalid={errors.ubicacion ? "true" : "false"}
              placeholder="Ingresa la ubicación"
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
            {image && <img src={URL.createObjectURL(image)} alt="Vista previa" className={styles.previewImage} />}
          </div>

          <h1 className={styles.sectionTitle}>Información Responsable Comunidad</h1>

          <div>
            <label className={styles.label}>Nombre Completo</label>
            <input
              type="text"
              {...register("nombreEncargado", { required: "Este campo es obligatorio" })}
              aria-invalid={errors.nombreEncargado ? "true" : "false"}
              placeholder="Ingresa tu nombre completo"
              className={errors.nombreEncargado ? styles.errorInput : ""}
            />
          </div>

          <div>
            <label className={styles.label}>Correo</label>
            <input
              type="text"
              {...register("correoEncargado", { required: "Este campo es obligatorio", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, message: "Correo no válido" } })}
              aria-invalid={errors.correoEncargado ? "true" : "false"}
              placeholder="Ingresa tu correo electrónico"
              className={errors.correoEncargado ? styles.errorInput : ""}
            />
          </div>

          <div>
            <label className={styles.label}>Teléfono</label>
            <input
              type="text"
              {...register('telefonoEncargado', { required: "Este campo es obligatorio", pattern: { value: /^\d{8}$/, message: "El teléfono debe tener 8 dígitos" } })}
              aria-invalid={errors.telefonoEncargado ? "true" : "false"}
              placeholder="Ingresa tu teléfono"
              className={errors.telefonoEncargado ? styles.errorInput : ""}
            />
          </div>

          <div>
            <label className={styles.label}>Edad</label>
            <input
              type="number"
              {...register('edadEncargado', { required: "Este campo es obligatorio", min: { value: 18, message: "Debes tener al menos 18 años" } })}
              aria-invalid={errors.edadEncargado ? "true" : "false"}
              placeholder="Ingresa tu edad"
              className={errors.edadEncargado ? styles.errorInput : ""}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>Enviar</button>
            <button type="button" className={styles.submitButton} onClick={handleSubmit((data) => onSubmit(data, true))}>Agregar Artesano</button>
          </div>
        </form>
      )}
    </div>
  );
};
