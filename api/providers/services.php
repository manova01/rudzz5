<?php
// api/providers/services.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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
        if (isset($_GET['id'])) {
            getServiceById($conn, $provider_id, $_GET['id']);
        } else {
            getProviderServices($conn, $provider_id);
        }
        break;
    case 'POST':
        createService($conn, $provider_id);
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Service ID is required"]);
            exit;
        }
        updateService($conn, $provider_id, $_GET['id']);
        break;
    case 'DELETE':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Service ID is required"]);
            exit;
        }
        deleteService($conn, $provider_id, $_GET['id']);
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

// Get all services for a provider
function getProviderServices($conn, $provider_id) {
    $query = "SELECT s.id, s.name, s.description, s.price, s.duration, s.category_id, c.name as category_name, 
              s.status, s.created_at, s.updated_at 
              FROM services s 
              LEFT JOIN categories c ON s.category_id = c.id 
              WHERE s.provider_id = ? 
              ORDER BY s.name ASC";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $provider_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $services = [];
    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($services);
}

// Get a specific service by ID
function getServiceById($conn, $provider_id, $service_id) {
    $query = "SELECT s.id, s.name, s.description, s.price, s.duration, s.category_id, c.name as category_name, 
              s.status, s.created_at, s.updated_at 
              FROM services s 
              LEFT JOIN categories c ON s.category_id = c.id 
              WHERE s.id = ? AND s.provider_id = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $service_id, $provider_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $service = $result->fetch_assoc();
        http_response_code(200);
        echo json_encode($service);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Service not found"]);
    }
}

// Create a new service
function createService($conn, $provider_id) {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (!isset($data->name) || !isset($data->price) || !isset($data->category_id)) {
        http_response_code(400);
        echo json_encode(["message" => "Name, price, and category are required"]);
        return;
    }
    
    // Sanitize input
    $name = htmlspecialchars(strip_tags($data->name));
    $description = isset($data->description) ? htmlspecialchars(strip_tags($data->description)) : "";
    $price = floatval($data->price);
    $duration = isset($data->duration) ? intval($data->duration) : 0;
    $category_id = intval($data->category_id);
    $status = isset($data->status) ? htmlspecialchars(strip_tags($data->status)) : "active";
    $created_at = date('Y-m-d H:i:s');
    
    // Insert new service
    $query = "INSERT INTO services (provider_id, name, description, price, duration, category_id, status, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("issdisss", $provider_id, $name, $description, $price, $duration, $category_id, $status, $created_at);
    
    if ($stmt->execute()) {
        $service_id = $conn->insert_id;
        
        // Return the created service
        getServiceById($conn, $provider_id, $service_id);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to create service"]);
    }
}

// Update an existing service
function updateService($conn, $provider_id, $service_id) {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Check if service exists and belongs to provider
    $check_query = "SELECT id FROM services WHERE id = ? AND provider_id = ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("ii", $service_id, $provider_id);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Service not found or not authorized"]);
        return;
    }
    
    // Prepare update fields
    $fields = [];
    $types = "";
    $values = [];
    
    // Check and add each field
    if (isset($data->name)) {
        $fields[] = "name = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->name));
    }
    
    if (isset($data->description)) {
        $fields[] = "description = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->description));
    }
    
    if (isset($data->price)) {
        $fields[] = "price = ?";
        $types .= "d";
        $values[] = floatval($data->price);
    }
    
    if (isset($data->duration)) {
        $fields[] = "duration = ?";
        $types .= "i";
        $values[] = intval($data->duration);
    }
    
    if (isset($data->category_id)) {
        $fields[] = "category_id = ?";
        $types .= "i";
        $values[] = intval($data->category_id);
    }
    
    if (isset($data->status)) {
        $fields[] = "status = ?";
        $types .= "s";
        $values[] = htmlspecialchars(strip_tags($data->status));
    }
    
    // Add updated_at timestamp
    $fields[] = "updated_at = ?";
    $types .= "s";
    $values[] = date('Y-m-d H:i:s');
    
    // Add service_id and provider_id to values array
    $values[] = $service_id;
    $values[] = $provider_id;
    $types .= "ii";
    
    // If no fields to update
    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(["message" => "No fields to update"]);
        return;
    }
    
    // Build query
    $query = "UPDATE services SET " . implode(", ", $fields) . " WHERE id = ? AND provider_id = ?";
    
    // Prepare and execute statement
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$values);
    
    if ($stmt->execute()) {
        // Return the updated service
        getServiceById($conn, $provider_id, $service_id);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to update service"]);
    }
}

// Delete a service
function deleteService($conn, $provider_id, $service_id) {
    // Check if service exists and belongs to provider
    $check_query = "SELECT id FROM services WHERE id = ? AND provider_id = ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("ii", $service_id, $provider_id);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Service not found or not authorized"]);
        return;
    }
    
    // Delete service
    $query = "DELETE FROM services WHERE id = ? AND provider_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $service_id, $provider_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Service deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to delete service"]);
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

