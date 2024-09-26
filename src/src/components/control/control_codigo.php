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

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    $response = ["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error];
    echo json_encode($response);
    exit();
}

// Obtener el código enviado por POST
if (!empty($_POST['codigo'])) {
    $codigo = $_POST['codigo'];

    // Escapar el código para evitar inyecciones SQL
    $codigo = $conn->real_escape_string($codigo);

    // Consultar el código en la base de datos y obtener el campo 'tipo' y 'IdUsuario'
    $sql = $conn->query("SELECT IdUsuario, codigo, tipo FROM usuario WHERE codigo='$codigo'");

    // Verificar si hubo un error en la consulta
    if (!$sql) {
        $response = ["status" => "error", "message" => "Error en la consulta: " . $conn->error];
        echo json_encode($response);
        exit();
    }

    if ($dato = $sql->fetch_object()) {
        // Si se encuentra el código, actualizar el estado de habilitación
        $sql = "UPDATE usuario SET habilitado='si' WHERE codigo = '$codigo'";
        $conn->query($sql);

        // Devolver el tipo del usuario y el IdUsuario en la respuesta JSON
        $response = [
            "status" => "success",
            "message" => "Cuenta habilitada",
            "tipo" => $dato->tipo,
            "userId" => $dato->IdUsuario // Cambiar a 'userId' para mayor claridad
        ];
    } else {
        $response = ["status" => "error", "message" => "El código no existe"];
    }
} else {
    $response = ["status" => "error", "message" => "Llene el campo"];
}

// Cerrar la conexión
$conn->close();
echo json_encode($response);
?>
