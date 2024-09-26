<?php

// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Responder a la solicitud OPTIONS y terminar
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; 
}

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si se ha enviado el IdUsuario
    if (!isset($_POST['userId'])) {
        echo json_encode(['status' => 'error', 'message' => 'IdUsuario no proporcionado']);
        exit();
    }

    // Obtener datos del formulario
    $userId = $_POST['userId'];
    $nombreComunidad = $_POST['nombreComunidad'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $ubicacion = $_POST['ubicacion'] ?? '';
    $ciudad = $_POST['ciudad'] ?? '';
    $foto = $_FILES['foto'] ?? null; // Manejar si no se subió una foto
    $nombreEncargado = $_POST['nombreEncargado'] ?? '';
    $correoEncargado = $_POST['correoEncargado'] ?? '';
    $telefonoEncargado = $_POST['telefonoEncargado'] ?? '';
    $edadEncargado = $_POST['edadEncargado'] ?? '';

    // Buscar información del usuario en la tabla usuario
    $stmt = $conn->prepare("SELECT nombre, correo FROM usuario WHERE IdUsuario = :userId");
    $stmt->execute([':userId' => $userId]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
        exit();
    }

    // Verificar si la comunidad ya existe
    $stmt = $conn->prepare("SELECT IdComunidad FROM comunidad WHERE IdUsuario = :userId");
    $stmt->execute([ ':userId' => $userId]);
    $comunidadExistente = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si la comunidad no existe, se inserta
    if (!$comunidadExistente) {
        // Guardar en la tabla comunidad
        $stmt = $conn->prepare("
            INSERT INTO comunidad (nombcomu, ubicacion, ciudad, IdUsuario)
            VALUES (:nombreComunidad, :ubicacion, :ciudad, :userId)
        ");
        $stmt->execute([':nombreComunidad' => $nombreComunidad, ':ubicacion' => $ubicacion, ':ciudad' => $ciudad, ':userId' => $userId]);

        $idComunidad = $conn->lastInsertId(); // Obtener el ID de la comunidad recién insertada
    } else {
        $idComunidad = $comunidadExistente['IdComunidad']; // Usar el ID de la comunidad existente
        
        $stmt = $conn->prepare("
            UPDATE comunidad SET nombcomu = :nombreComunidad, ubicacion = :ubicacion, ciudad = :ciudad 
            WHERE IdComunidad = :idComunidad AND IdUsuario = :userId
        ");
        $stmt->execute([':nombreComunidad' => $nombreComunidad, ':ubicacion' => $ubicacion, ':ciudad' => $ciudad, ':idComunidad' => $idComunidad, ':userId' => $userId]);
    }

    // Manejar la subida de la foto si se proporciona
    if ($foto && $foto['error'] === UPLOAD_ERR_OK) {
        $fotoPath = 'ruta/donde/guardar/' . basename($foto['name']);
        if (!move_uploaded_file($foto['tmp_name'], $fotoPath)) {
            echo json_encode(['status' => 'error', 'message' => 'Error al subir la imagen']);
            exit();
        }
    }

    // Verificar si el blog ya existe para la comunidad
    $stmt = $conn->prepare("SELECT IdBlog FROM blog WHERE IdComunidad = :idComunidad");
    $stmt->execute([':idComunidad' => $idComunidad]);
    $blogExistente = $stmt->fetch(PDO::FETCH_ASSOC);

    // Si el blog no existe, se inserta
    if (!$blogExistente) {
        $stmt = $conn->prepare("
            INSERT INTO blog (historia, IdComunidad)
            VALUES (:descripcion, :idComunidad)
        ");
        $stmt->execute([':descripcion' => $descripcion, ':idComunidad' => $idComunidad]);
    } else {
        // Si el blog existe, actualizarlo
        $stmt = $conn->prepare("
            UPDATE blog SET historia = :descripcion WHERE IdComunidad = :idComunidad
        ");
        $stmt->execute([':descripcion' => $descripcion, ':idComunidad' => $idComunidad]);
    }

    // Actualizar nombre, correo, teléfono y edad en la tabla usuario
    $stmt = $conn->prepare("
        UPDATE usuario SET nombre = :nombre, correo = :correo, telefono = :telefono, edad = :edad 
        WHERE IdUsuario = :userId
    ");
    $stmt->execute([
        ':nombre' => $nombreEncargado,
        ':correo' => $correoEncargado,
        ':telefono' => $telefonoEncargado,
        ':edad' => $edadEncargado,
        ':userId' => $userId
    ]);

    // Devuelve el idComunidad junto con el mensaje de éxito
    echo json_encode(['status' => 'success', 'idComunidad' => $idComunidad]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
