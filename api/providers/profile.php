<?php
// api/providers/profile.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
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

// Validate JWT token
$jwt = getBearerToken();
if (!$jwt) {
    http_response_code(401);
    echo json_encode(["message" => "Access denied"]);
    exit;
}

$decoded = validateJWT($jwt);
if (!$decoded) {
    http_response_code(401);
    echo json_encode(["message" => "Access denied"]);
    exit;
}

$provider_id = $decoded->provider_id;

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        getProviderProfile($conn, $provider_id);
        break;
    case 'PUT':
        updateProviderProfile($conn, $provider_id);
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

// Get provider profile
function getProviderProfile($conn, $provider_id) {
    $query = "SELECT id, business_name, email, phone, address, city, state, zip_code, description, website, 
              logo_url, created_at, updated_at FROM providers WHERE id = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $provider_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $provider = $result->fetch_assoc();
        http_response_code(200);
        echo json_encode($provider);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Provider not found"]);
    }
}

// Update provider profile
function updateProviderProfile($conn, $provider_id) {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Prepare update fields
    $fields = [];
    $types = "";
    $values = [];
    
    // Check and add each field
    if (isset($data->business_name)) {
        $fields[] = "business_name = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->business_name));
    }
    
    if (isset($data->phone)) {
        $fields[] = "phone = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->phone));
    }
    
    if (isset($data->address)) {
        $fields[] = "address = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->address));
    }
    
    if (isset($data->city)) {
        $fields[] = "city = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->city));
    }
    
    if (isset($data->state)) {
        $fields[] = "state = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->state));
    }
    
    if (isset($data->zip_code)) {
        $fields[] = "zip_code = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->zip_code));
    }
    
    if (isset($data->description)) {
        $fields[] = "description = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->description));
    }
    
    if (isset($data->website)) {
        $fields[] = "website = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->website));
    }
    
    // Add updated_at timestamp
    $fields[] = "updated_at = ?";
    $types .= "s";
    $values[] = date('Y-m-d H:i:s');
    
    // Add provider_id to values array
    $values[] = $provider_id;
    $types .= "i";
    
    // If no fields to update
    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(["message" => "No fields to update"]);
        return;
    }
    
    // Build query
    $query = "UPDATE providers SET " . implode(", ", $fields) . " WHERE id = ?";
    
    // Prepare and execute statement
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$values);
    
    if ($stmt->execute()) {
        // Get updated profile
        getProviderProfile($conn, $provider_id);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to update profile"]);
    }
}

// Helper function to get bearer token from header
function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}
?>

