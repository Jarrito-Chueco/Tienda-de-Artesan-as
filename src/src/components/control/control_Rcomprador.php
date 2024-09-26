<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('log_errors', 1);
ini_set('error_log', 'path_to_error_log.log'); // Reemplaza con la ruta donde quieres almacenar los logs de errores
error_log("PHP script started"); // Esto es para comprobar que el log funciona

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data["nombre"]) && !empty($data["apellido"]) && !empty($data["ci"]) && !empty($data["correo"]) && !empty($data["contrasena"])) {
    $nombre = $data['nombre'];
    $apellidos = $data['apellido'];
    $ci = $data['ci']; // Obtén el CI del data
    $correo = $data['correo'];
    $contrasena = $data['contrasena'];
    $telefono = $data['telefono'];
    $edad = $data['edad'];

    if (preg_match('/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/', $contrasena)) {
        $sql = $conn->query("SELECT correo FROM usuario WHERE correo='$correo'");
        if ($sql->fetch_object()) {
            echo json_encode(["success" => false, "message" => "El correo ya existe"]);
        } else {
            $contra = md5($contrasena);
            $codigo = bin2hex(random_bytes(8));
            $habilitado = "no";
            $tipo = "comprador"; // Cambié a 'comprador'

            $sqlUsuario = "INSERT INTO usuario (nombre, correo, telefono, contrasena, habilitado, codigo, tipo, edad) 
                           VALUES ('$nombre', '$correo','$telefono', '$contra', '$habilitado', '$codigo', '$tipo', '$edad')";

            if ($conn->query($sqlUsuario) === TRUE) {
                $userId = $conn->insert_id;

                // Inserta en la tabla comprador
                $sqlComprador = "INSERT INTO comprador (apellido, IdUsuario, ci) VALUES ('$apellidos', $userId, '$ci')";
                if ($conn->query($sqlComprador) === TRUE) {
                    $response = ["success" => true, "message" => "Registro exitoso"];

                    // Código para enviar correo con PHPMailer...
                    require '../PHPMailer/Exception.php';
                    require '../PHPMailer/PHPMailer.php';
                    require '../PHPMailer/SMTP.php';
                    $mail = new PHPMailer(true);

                    try {
                        $mail->isSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'jarritochueco@gmail.com';
                        $mail->Password = 'grknlubmnnxiywkx'; // Usar una contraseña de aplicación generada en Gmail
                        $mail->SMTPSecure = 'ssl';
                        $mail->Port = 465;
                        $mail->setFrom('jarritochueco@gmail.com', 'JarritoChueco');
                        $mail->addAddress($correo);
                        $mail->isHTML(true);
                        $mail->Subject = 'Registro de cuenta JarritoChueco';
                        $mail->Body = "Su código para activar su cuenta es: $codigo";

                        $mail->send();
                    } catch (Exception $e) {
                        $response["message"] .= " (sin embargo, no se pudo enviar el correo de activación)";
                    }

                    echo json_encode($response);
                } else {
                    echo json_encode(["success" => false, "message" => "Error al insertar en la tabla comprador: " . $conn->error]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Error en la base de datos: " . $conn->error]);
            }
        }
    } else {
        echo json_encode(["success" => false, "message" => "La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y símbolos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Por favor, complete todos los campos"]);
}

$conn->close();
?>
