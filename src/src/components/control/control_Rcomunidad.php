<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir solicitudes desde tu app React
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Permitir métodos POST y OPTIONS
header("Access-Control-Allow-Headers: Content-Type"); // Permitir encabezados Content-Type

ini_set('log_errors', 1);
ini_set('error_log', 'path_to_error_log.log'); // Reemplaza con la ruta donde quieres almacenar los logs de errores
error_log("PHP script started"); // Esto es para comprobar que el log funciona


// Manejar las solicitudes de tipo OPTIONS para CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar que el método de la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit();
}




//-------------------------Para enviar correos
                            //Import PHPMailer classes into the global namespace
                            //These must be at the top of your script, not inside a function
                            use PHPMailer\PHPMailer\PHPMailer;
                            use PHPMailer\PHPMailer\Exception;
//------------------



// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

// Leer los datos enviados desde el frontend en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

$response = [];

// Verificar si los datos no están vacíos
if (!empty($data["nombreComunidad"]) && !empty($data["nombreResponsable"]) && !empty($data["email"]) && !empty($data["password"])) {

    // Verificar si la contraseña tiene al menos 8 caracteres y cumple con las condiciones
    $contrasena = $data['password'];
    if (preg_match('/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/', $contrasena)) {
        $nombreComunidad = $data['nombreComunidad'];
        $nombreResponsable = $data['nombreResponsable'];
        $correo = $data['email'];

        // Verificamos si el correo ya existe
        $sql = $conn->query("SELECT correo FROM usuario WHERE correo='$correo'");
        if ($sql->fetch_object()) {
            $response = ["status" => "error", "message" => "El correo ya existe"];
        } else {
            // Se encripta la contraseña
            $contra = md5($contrasena);
            // Se genera un número aleatorio para enviar al correo y habilitar la cuenta
            $codigo = bin2hex(random_bytes(8));
            // Para controlar si se habilitó la cuenta
            $habilitado = "no";
            $tipo="comunidad";
            
            // Crear la consulta SQL para insertar el usuario
            $sql = "INSERT INTO usuario (nombre, correo, contrasena, habilitado, codigo, tipo) VALUES ('$nombreResponsable', '$correo', '$contra', '$habilitado', '$codigo','$tipo')";
            
            if ($conn->query($sql) === TRUE) {
                // Obtener el ID del último usuario insertado
                $userId = $conn->insert_id;

                // Insertar el nombre de la comunidad en la tabla comunidad
                $sqlComunidad = "INSERT INTO comunidad (nombcomu, IdUsuario) VALUES ('$nombreComunidad', $userId)";
                if ($conn->query($sqlComunidad) === TRUE) {
                    $response = ["status" => "success", "message" => "Registro exitoso"];
                    
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
                        $mail->Body = "Su codigo para activar su cuenta es: $codigo";

                        $mail->send();
                    } catch (Exception $e) {
                        $response["message"] .= " (sin embargo, no se pudo enviar el correo de activación)";
                    }

                } else {
                    $response = ["status" => "error", "message" => "Error al insertar en la tabla comunidad: " . $conn->error];
                }
            } else {
                $response = ["status" => "error", "message" => "Error en la base de datos: " . $conn->error];
            }
        }
    } else {
        $response = ["status" => "error", "message" => "La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y símbolos"];
    }
} else {
    $response = ["status" => "error", "message" => "Por favor, complete todos los campos"];
}

$conn->close();
echo json_encode($response);
?>
