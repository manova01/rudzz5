<?php
// api/providers/auth.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include database and JWT utilities
require_once '../config/database.php';
require_once '../utils/jwt_utils.php';

// Get database connection
$database = new Database();
$conn = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Check if action is set
if (!isset($data->action)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing action parameter"]);
    exit;
}

// Handle different actions
switch ($data->action) {
    case 'login':
        handleLogin($conn, $data);
        break;
    case 'register':
        handleRegister($conn, $data);
        break;
    case 'logout':
        handleLogout();
        break;
    default:
        http_response_code(400);
        echo json_encode(["message" => "Invalid action"]);
        break;
}

// Handle provider login
function handleLogin($conn, $data) {
    // Validate required fields
    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["message" => "Email and password are required"]);
        return;
    }

    // Sanitize input
    $email = htmlspecialchars(strip_tags($data->email));
    $password = $data->password;

    // Query to find provider
    $query = "SELECT id, business_name, email, password FROM providers WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $provider = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $provider['password'])) {
            // Create JWT token
            $token = createJWT([
                "provider_id" => $provider['id'],
                "business_name" => $provider['business_name'],
                "email" => $provider['email'],
                "role" => "provider"
            ]);

            // Return success with token
            http_response_code(200);
            echo json_encode([
                "message" => "Login successful",
                "token" => $token,
                "provider" => [
                    "id" => $provider['id'],
                    "business_name" => $provider['business_name'],
                    "email" => $provider['email']
                ]
            ]);
        } else {
            // Invalid password
            http_response_code(401);
            echo json_encode(["message" => "Invalid credentials"]);
        }
    } else {
        // Provider not found
        http_response_code(401);
        echo json_encode(["message" => "Invalid credentials"]);
    }
}

// Handle provider registration
function handleRegister($conn, $data) {
    // Validate required fields
    if (!isset($data->business_name) || !isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["message" => "Business name, email, and password are required"]);
        return;
    }

    // Sanitize input
    $business_name = htmlspecialchars(strip_tags($data->business_name));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $phone = isset($data->phone) ? htmlspecialchars(strip_tags($data->phone)) : "";
    $address = isset($data->address) ? htmlspecialchars(strip_tags($data->address)) : "";
    $city = isset($data->city) ? htmlspecialchars(strip_tags($data->city)) : "";
    $state = isset($data->state) ? htmlspecialchars(strip_tags($data->state)) : "";
    $zip_code = isset($data->zip_code) ? htmlspecialchars(strip_tags($data->zip_code)) : "";
    $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : "";
    $website = isset($data->website) ? htmlspecialchars(strip_tags($data->website)) : "";
    $created_at = date('Y-m-d H:i:s');

    // Check if email already exists
    $check_query = "SELECT id FROM providers WHERE email = ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["message" => "Email already exists"]);
        return;
    }

    // Insert new provider
    $query = "INSERT INTO providers (business_name, email, password, phone, address, city, state, zip_code, description, website, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssssssssss", $business_name, $email, $password, $phone, $address, $city, $state, $zip_code, $description, $website, $created_at);

    if ($stmt->execute()) {
        $provider_id = $conn->insert_id;
        
        // Create JWT token
        $token = createJWT([
            "provider_id" => $provider_id,
            "business_name" => $business_name,
            "email" => $email,
            "role" => "provider"
        ]);

        // Return success with token
        http_response_code(201);
        echo json_encode([
            "message" => "Provider registered successfully",
            "token" => $token,
            "provider" => [
                "id" => $provider_id,
                "business_name" => $business_name,
                "email" => $email
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to register provider"]);
    }
}

// Handle logout
function handleLogout() {
    // For JWT, we don't need to do anything server-side
    // The client will remove the token
    http_response_code(200);
    echo json_encode(["message" => "Logout successful"]);
}
?>

