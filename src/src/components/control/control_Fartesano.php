<?php

// Habilitar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Encabezados CORS y de respuesta
header("Access-Control-Allow-Origin: http://localhost:3000"); // Asegúrate de que la URL de tu frontend sea correcta
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Configura los detalles de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda"; 


$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtiene los datos enviados
$nombreArtesano = $_POST['nombreArtesano'] ?? '';
$idComunidad = $_POST['idComunidad'] ?? '';
$nombreProducto = $_POST['nombreProducto'] ?? '';
$precioProducto = $_POST['precioProducto'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';

// Función para verificar si un artesano ya existe
function artesanoExiste($conn, $nombreArtesano) {
    $stmt = $conn->prepare("SELECT idArtesano FROM artesanos WHERE nombre = '$nombreArtesano'");
    $stmt->bind_param("s", $nombreArtesano);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows > 0; // Retorna verdadero si el artesano existe
}

// Función para agregar un artesano
function agregarArtesano($conn, $nombreArtesano, $idComunidad) {
    $stmt = $conn->prepare("INSERT INTO artesanos (nombre, idComunidad) VALUES ('$nombreArtesano', '$idComunidad')");
    $stmt->bind_param("si", $nombreArtesano, $idComunidad);
    return $stmt->execute() ? $conn->insert_id : false; // Retorna el ID del artesano añadido
}

// Función para verificar si un producto ya existe
function productoExiste($conn, $nombreProducto) {
    $stmt = $conn->prepare("SELECT idProducto FROM productos WHERE nombre = '$nombreProducto'");
    $stmt->bind_param("s", $nombreProducto);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows > 0; // Retorna verdadero si el producto existe
}

// Función para agregar un producto
function agregarProducto($conn, $nombreProducto, $precioProducto, $descripcion, $idArtesano) {
    $stmt = $conn->prepare("INSERT INTO productos (nombre, precio, descripcion, idArtesano) VALUES ('$nombreProducto', '$precioProducto', '$descripcion', '$idArtesano')");
    $stmt->bind_param("sdsi", $nombreProducto, $precioProducto, $descripcion, $idArtesano);
    return $stmt->execute(); // Retorna verdadero si se agrega el producto correctamente
}

// Comenzar la transacción
$conn->begin_transaction();
try {
    // Primero, verificar si el artesano ya existe
    if (!artesanoExiste($conn, $nombreArtesano)) {
        // Agregar artesano y obtener su ID
        $idArtesano = agregarArtesano($conn, $nombreArtesano, $idComunidad);
    } else {
        // Si el artesano ya existe, obtener su ID
        $stmt = $conn->prepare("SELECT idArtesano FROM artesanos WHERE nombre = '$nombreArtesano'");
        $stmt->bind_param("s", $nombreArtesano);
        $stmt->execute();
        $stmt->bind_result($idArtesano);
        $stmt->fetch();
    }

    // Verificar si el producto ya existe
    if (!productoExiste($conn, $nombreProducto)) {
        // Agregar producto
        agregarProducto($conn, $nombreProducto, $precioProducto, $descripcion, $idArtesano);
    }

    // Confirmar la transacción
    $conn->commit();
    echo json_encode(["success" => true, "message" => "Artesano y producto añadidos correctamente."]);
} catch (Exception $e) {
    // Revertir la transacción en caso de error
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}

// Cerrar la conexión
$conn->close();
?>
