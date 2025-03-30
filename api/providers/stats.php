<?php
// api/providers/stats.php
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

// Handle different stat types
if (isset($_GET['type']) && $_GET['type'] === 'performance') {
    getPerformanceData($conn, $provider_id);
} else {
    getDashboardStats($conn, $provider_id);
}

// Get dashboard statistics
function getDashboardStats($conn, $provider_id) {
    // Current month and previous month
    $current_month_start = date('Y-m-01 00:00:00');
    $current_month_end = date('Y-m-t 23:59:59');
    $prev_month_start = date('Y-m-01 00:00:00', strtotime('-1 month'));
    $prev_month_end = date('Y-m-t 23:59:59', strtotime('-1 month'));
    
    // Get total services count
    $services_query = "SELECT COUNT(*) as total FROM services WHERE provider_id = ? AND status = 'active'";
    $services_stmt = $conn->prepare($services_query);
    $services_stmt->bind_param("i", $provider_id);
    $services_stmt->execute();
    $services_result = $services_stmt->get_result();
    $services_row = $services_result->fetch_assoc();
    $total_services = $services_row['total'];
    
    // Get services added this month
    $new_services_query = "SELECT COUNT(*) as total FROM services WHERE provider_id = ? AND created_at BETWEEN ? AND ?";
    $new_services_stmt = $conn->prepare($new_services_query);
    $new_services_stmt->bind_param("iss", $provider_id, $current_month_start, $current_month_end);
    $new_services_stmt->execute();
    $new_services_result = $new_services_stmt->get_result();
    $new_services_row = $new_services_result->fetch_assoc();
    $new_services = $new_services_row['total'];
    
    // Get services added last month
    $prev_services_stmt = $conn->prepare($new_services_query);
    $prev_services_stmt->bind_param("iss", $provider_id, $prev_month_start, $prev_month_end);
    $prev_services_stmt->execute();
    $prev_services_result = $prev_services_stmt->get_result();
    $prev_services_row = $prev_services_result->fetch_assoc();
    $prev_services = $prev_services_row['total'];
    
    // Calculate services delta
    $services_delta = $prev_services > 0 ? $new_services - $prev_services : $new_services;
    
    // Get total appointments count for current month
    $appointments_query = "SELECT COUNT(*) as total FROM appointments WHERE provider_id = ? AND appointment_date BETWEEN ? AND ?";
    $appointments_stmt = $conn->prepare($appointments_query);
    $appointments_stmt->bind_param("iss", $provider_id, $current_month_start, $current_month_end);
    $appointments_stmt->execute();
    $appointments_result = $appointments_stmt->get_result();
    $appointments_row = $appointments_result->fetch_assoc();
    $total_appointments = $appointments_row['total'];
    
    // Get appointments for previous month
    $prev_appointments_stmt = $conn->prepare($appointments_query);
    $prev_appointments_stmt->bind_param("iss", $provider_id, $prev_month_start, $prev_month_end);
    $prev_appointments_stmt->execute();
    $prev_appointments_result = $prev_appointments_stmt->get_result();
    $prev_appointments_row = $prev_appointments_result->fetch_assoc();
    $prev_appointments = $prev_appointments_row['total'];
    
    // Calculate appointments delta
    $appointments_delta = $prev_appointments > 0 ? $total_appointments - $prev_appointments : $total_appointments;
    
    // Get average rating
    $rating_query = "SELECT AVG(rating) as avg_rating FROM reviews WHERE provider_id = ?";
    $rating_stmt = $conn->prepare($rating_query);
    $rating_stmt->bind_param("i", $provider_id);
    $rating_stmt->execute();
    $rating_result = $rating_stmt->get_result();
    $rating_row = $rating_result->fetch_assoc();
    $avg_rating = $rating_row['avg_rating'] ? floatval($rating_row['avg_rating']) : 0;
    
    // Get average rating for previous month
    $prev_rating_query = "SELECT AVG(rating) as avg_rating FROM reviews WHERE provider_id = ? AND created_at BETWEEN ? AND ?";
    $prev_rating_stmt = $conn->prepare($prev_rating_query);
    $prev_rating_stmt->bind_param("iss", $provider_id, $prev_month_start, $prev_month_end);
    $prev_rating_stmt->execute();
    $prev_rating_result = $prev_rating_stmt->get_result();
    $prev_rating_row = $prev_rating_result->fetch_assoc();
    $prev_avg_rating = $prev_rating_row['avg_rating'] ? floatval($prev_rating_row['avg_rating']) : 0;
    
    // Calculate rating delta
    $rating_delta = $prev_avg_rating > 0 ? $avg_rating - $prev_avg_rating : 0;
    
    // Get total revenue for current month
    $revenue_query = "SELECT SUM(amount) as total FROM payments WHERE provider_id = ? AND payment_date BETWEEN ? AND ?";
    $revenue_stmt = $conn->prepare($revenue_query);
    $revenue_stmt->bind_param("iss", $provider_id, $current_month_start, $current_month_end);
    $revenue_stmt->execute();
    $revenue_result = $revenue_stmt->get_result();
    $revenue_row = $revenue_result->fetch_assoc();
    $total_revenue = $revenue_row['total'] ? floatval($revenue_row['total']) : 0;
    
    // Get revenue for previous month
    $prev_revenue_stmt = $conn->prepare($revenue_query);
    $prev_revenue_stmt->bind_param("iss", $provider_id, $prev_month_start, $prev_month_end);
    $prev_revenue_stmt->execute();
    $prev_revenue_result = $prev_revenue_stmt->get_result();
    $prev_revenue_row = $prev_revenue_result->fetch_assoc();
    $prev_revenue = $prev_revenue_row['total'] ? floatval($prev_revenue_row['total']) : 0;
    
    // Calculate revenue delta as percentage
    $revenue_delta = $prev_revenue > 0 ? (($total_revenue - $prev_revenue) / $prev_revenue) * 100 : 0;
    
    // Prepare response
    $stats = [
        "totalServices" => $total_services,
        "servicesDelta" => $services_delta,
        "totalAppointments" => $total_appointments,
        "appointmentsDelta" => $appointments_delta,
        "averageRating" => $avg_rating,
        "ratingDelta" => $rating_delta,
        "totalRevenue" => $total_revenue,
        "revenueDelta" => round($revenue_delta)
    ];
    
    http_response_code(200);
    echo json_encode($stats);
}

// Get performance data for charts
function getPerformanceData($conn, $provider_id) {
    // Get data for the last 6 months
    $months = [];
    $current_month = date('Y-m');
    
    for ($i = 5; $i >= 0; $i--) {
        $month = date('Y-m', strtotime("-$i months"));
        $month_name = date('M', strtotime("-$i months"));
        $months[$month] = [
            "name" => $month_name,
            "appointments" => 0,
            "revenue" => 0
        ];
    }
    
    // Get appointments by month
    $appointments_query = "SELECT DATE_FORMAT(appointment_date, '%Y-%m') as month, COUNT(*) as total 
                          FROM appointments 
                          WHERE provider_id = ? AND appointment_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) 
                          GROUP BY month";
    
    $appointments_stmt = $conn->prepare($appointments_query);
    $appointments_stmt->bind_param("i", $provider_id);
    $appointments_stmt->execute();
    $appointments_result = $appointments_stmt->get_result();
    
    while ($row = $appointments_result->fetch_assoc()) {
        if (isset($months[$row['month']])) {
            $months[$row['month']]['appointments'] = intval($row['total']);
        }
    }
    
    // Get revenue by month
    $revenue_query = "SELECT DATE_FORMAT(payment_date, '%Y-%m') as month, SUM(amount) as total 
                     FROM payments 
                     WHERE provider_id = ? AND payment_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) 
                     GROUP BY month";
    
    $revenue_stmt = $conn->prepare($revenue_query);
    $revenue_stmt->bind_param("i", $provider_id);
    $revenue_stmt->execute();
    $revenue_result = $revenue_stmt->get_result();
    
    while ($row = $revenue_result->fetch_assoc()) {
        if (isset($months[$row['month']])) {
            $months[$row['month']]['revenue'] = floatval($row['total']);
        }
    }
    
    // Convert to array for response
    $performance_data = array_values($months);
    
    http_response_code(200);
    echo json_encode($performance_data);
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

