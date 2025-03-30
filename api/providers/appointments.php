<?php
// api/providers/appointments.php
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
        if (isset($_GET['id'])) {
            getAppointmentById($conn, $provider_id, $_GET['id']);
        } else {
            getProviderAppointments($conn, $provider_id);
        }
        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Appointment ID is required"]);
            exit;
        }
        updateAppointmentStatus($conn, $provider_id, $_GET['id']);
        break;
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

// Get all appointments for a provider
function getProviderAppointments($conn, $provider_id) {
    // Build query with optional filters
    $query = "SELECT a.id, a.user_id, u.name as customer_name, u.email as customer_email, 
              a.service_id, s.name as service_name, a.appointment_date, a.appointment_time, 
              a.status, a.notes, a.created_at 
              FROM appointments a 
              JOIN users u ON a.user_id = u.id 
              JOIN services s ON a.service_id = s.id 
              WHERE a.provider_id = ?";
    
    $params = [$provider_id];
    $types = "i";
    
    // Add status filter if provided
    if (isset($_GET['status']) && !empty($_GET['status'])) {
        $query .= " AND a.status = ?";
        $params[] = $_GET['status'];
        $types .= "s";
    }
    
    // Add date filter if provided
    if (isset($_GET['date']) && !empty($_GET['date'])) {
        $query .= " AND DATE(a.appointment_date) = ?";
        $params[] = $_GET['date'];
        $types .= "s";
    }
    
    // Order by appointment date and time
    $query .= " ORDER BY a.appointment_date ASC, a.appointment_time ASC";
    
    // Add limit if provided
    if (isset($_GET['limit']) && is_numeric($_GET['limit'])) {
        $query .= " LIMIT ?";
        $params[] = intval($_GET['limit']);  {
        $query .= " LIMIT ?";
        $params[] = intval($_GET['limit']);
        $types .= "i";
    }
    
    // Prepare and execute statement
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        // Format the appointment data
        $appointment = [
            "id" => $row['id'],
            "customer" => [
                "id" => $row['user_id'],
                "name" => $row['customer_name'],
                "email" => $row['customer_email'],
                "avatar" => "/placeholder.svg",
                "initials" => getInitials($row['customer_name'])
            ],
            "service" => $row['service_name'],
            "date" => formatDate($row['appointment_date']),
            "time" => $row['appointment_time'],
            "status" => $row['status'],
            "notes" => $row['notes'],
            "created_at" => $row['created_at']
        ];
        
        $appointments[] = $appointment;
    }
    
    http_response_code(200);
    echo json_encode($appointments);
}

// Get a specific appointment by ID
function getAppointmentById($conn, $provider_id, $appointment_id) {
    $query = "SELECT a.id, a.user_id, u.name as customer_name, u.email as customer_email, 
              a.service_id, s.name as service_name, a.appointment_date, a.appointment_time, 
              a.status, a.notes, a.created_at 
              FROM appointments a 
              JOIN users u ON a.user_id = u.id 
              JOIN services s ON a.service_id = s.id 
              WHERE a.id = ? AND a.provider_id = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $appointment_id, $provider_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Format the appointment data
        $appointment = [
            "id" => $row['id'],
            "customer" => [
                "id" => $row['user_id'],
                "name" => $row['customer_name'],
                "email" => $row['customer_email'],
                "avatar" => "/placeholder.svg",
                "initials" => getInitials($row['customer_name'])
            ],
            "service" => $row['service_name'],
            "date" => formatDate($row['appointment_date']),
            "time" => $row['appointment_time'],
            "status" => $row['status'],
            "notes" => $row['notes'],
            "created_at" => $row['created_at']
        ];
        
        http_response_code(200);
        echo json_encode($appointment);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Appointment not found"]);
    }
}

// Update appointment status
function updateAppointmentStatus($conn, $provider_id, $appointment_id) {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (!isset($data->status)) {
        http_response_code(400);
        echo json_encode(["message" => "Status is required"]);
        return;
    }
    
    // Check if appointment exists and belongs to provider
    $check_query = "SELECT id FROM appointments WHERE id = ? AND provider_id = ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("ii", $appointment_id, $provider_id);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Appointment not found or not authorized"]);
        return;
    }
    
    // Sanitize input
    $status = htmlspecialchars(strip_tags($data->status));
    $updated_at = date('Y-m-d H:i:s');
    
    // Update appointment status
    $query = "UPDATE appointments SET status = ?, updated_at = ? WHERE id = ? AND provider_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssii", $status, $updated_at, $appointment_id, $provider_id);
    
    if ($stmt->execute()) {
        // Return the updated appointment
        getAppointmentById($conn, $provider_id, $appointment_id);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to update appointment status"]);
    }
}

// Helper function to get initials from name
function getInitials($name) {
    $words = explode(' ', $name);
    $initials = '';
    
    foreach ($words as $word) {
        $initials .= strtoupper(substr($word, 0, 1));
    }
    
    return substr($initials, 0, 2);
}

// Helper function to format date
function formatDate($date) {
    $timestamp = strtotime($date);
    $today = strtotime('today');
    $tomorrow = strtotime('tomorrow');
    
    if ($timestamp >= $today && $timestamp < $tomorrow) {
        return 'Today';
    } else if ($timestamp >= $tomorrow && $timestamp < strtotime('+2 days')) {
        return 'Tomorrow';
    } else {
        return date('M j, Y', $timestamp);
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

