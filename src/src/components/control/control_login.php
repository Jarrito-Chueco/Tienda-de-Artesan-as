<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Verificar si se recibieron los datos por POST
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['correo']) && !empty($data['contrasena'])) {
    $correo = $data['correo'];
    $contrasena = $data['contrasena'];

    // Verificar si el correo existe y obtener el campo habilitado
    $sql = $conn->query("SELECT correo, habilitado FROM usuario WHERE correo='$correo'");

    if ($sql->num_rows > 0) {
        $usuario = $sql->fetch_assoc();

        // Verificar si la cuenta está habilitada
        if ($usuario['habilitado'] === 'no') {
            $response = ["success" => false, "message" => "La cuenta no ha sido validada. Por favor, verifica tu correo."];
        } else {
            // Verificar si la contraseña es correcta
            $contraencrip = md5($contrasena);
            $sql = $conn->query("SELECT correo FROM usuario WHERE correo='$correo' AND contrasena='$contraencrip'");

            if ($sql->num_rows > 0) {
                $response = ["success" => true, "message" => "Inicio de sesión exitoso"];
            } else {
                $response = ["success" => false, "message" => "Contraseña incorrecta"];
            }
        }
    } else {
        $response = ["success" => false, "message" => "Correo incorrecto o la cuenta no existe"];
    }
} else {
    $response = ["success" => false, "message" => "Llene todos los campos"];
}

$conn->close();
echo json_encode($response);
?>
