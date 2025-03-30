<?php
// api/providers/reviews.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        getReviewById($conn, $provider_id, $_GET['id']);
    } else {
        getProviderReviews($conn, $provider_id);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}

// Get all reviews for a provider
function getProviderReviews($conn, $provider_id) {
    // Build query with optional filters
    $query = "SELECT r.id, r.user_id, u.name as customer_name, r.service_id, s.name as service_name, 
              r.rating, r.comment, r.created_at 
              FROM reviews r 
              JOIN users u ON r.user_id = u.id 
              JOIN services s ON r.service_id = s.id 
              WHERE r.provider_id = ?";
    
    $params = [$provider_id];
    $types = "i";
    
    // Add rating filter if provided
    if (isset($_GET['rating']) && is_numeric($_GET['rating'])) {
        $query .= " AND r.rating = ?";
        $params[] = intval($_GET['rating']);
        $types .= "i";
    }
    
    // Order by date, newest first
    $query .= " ORDER BY r.created_at DESC";
    
    // Add limit if provided
    if (isset($_GET['limit']) && is_numeric($_GET['limit'])) {
        $query .= " LIMIT ?";
        $params[] = intval($_GET['limit']);
        $types .= "i";
    }
    
    // Prepare and execute statement
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $reviews = [];
    while ($row = $result->fetch_assoc()) {
        // Format the review data
        $review = [
            "id" => $row['id'],
            "customer" => [
                "name" => $row['customer_name'],
                "avatar" => "/placeholder.svg",
                "initials" => getInitials($row['customer_name'])
            ],
            "service" => $row['service_name'],
            "rating" => intval($row['rating']),
            "comment" => $row['comment'],
            "date" => getTimeAgo($row['created_at'])
        ];
        
        $reviews[] = $review;
    }
    
    http_response_code(200);
    echo json_encode($reviews);
}

// Get a specific review by ID
function getReviewById($conn, $provider_id, $review_id) {
    $query = "SELECT r.id, r.user_id, u.name as customer_name, r.service_id, s.name as service_name, 
              r.rating, r.comment, r.created_at 
              FROM reviews r 
              JOIN users u ON r.user_id = u.id 
              JOIN services s ON r.service_id = s.id 
              WHERE r.id = ? AND r.provider_id = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $review_id, $provider_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Format the review data
        $review = [
            "id" => $row['id'],
            "customer" => [
                "name" => $row['customer_name'],
                "avatar" => "/placeholder.svg",
                "initials" => getInitials($row['customer_name'])
            ],
            "service" => $row['service_name'],
            "rating" => intval($row['rating']),
            "comment" => $row['comment'],
            "date" => getTimeAgo($row['created_at'])
        ];
        
        http_response_code(200);
        echo json_encode($review);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Review not found"]);
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

// Helper function to format time ago
function getTimeAgo($datetime) {
    $time = strtotime($datetime);
    $now = time();
    $diff = $now - $time;
    
    if ($diff < 60) {
        return "just now";
    } else if ($diff < 3600) {
        $mins = floor($diff / 60);
        return $mins . " min" . ($mins > 1 ? "s" : "") . " ago";
    } else if ($diff < 86400) {
        $hours = floor($diff / 3600);
        return $hours . " hour" . ($hours > 1 ? "s" : "") . " ago";
    } else if ($diff < 604800) {
        $days = floor($diff / 86400);
        return $days . " day" . ($days > 1 ? "s" : "") . " ago";
    } else if ($diff < 2592000) {
        $weeks = floor($diff / 604800);
        return $weeks . " week" . ($weeks > 1 ? "s" : "") . " ago";
    } else {
        return date("M j, Y", $time);
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

