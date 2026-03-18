<?php
// Database connection settings
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password
$dbname = "pizza_ordering_system"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = $conn->real_escape_string(trim($_POST['name']));
    $email = $conn->real_escape_string(trim($_POST['email']));
    $phone = $conn->real_escape_string(trim($_POST['phone']));
    $feedback = $conn->real_escape_string(trim($_POST['feedback']));

    // Validate input
    if (!empty($name) && !empty($email) && !empty($phone) && !empty($feedback)) {
        / Prepare and bind
        $stmt = $conn->prepare("INSERT INTO feedback (name, email, phone, feedback) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $feedback);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Feedback submitted successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "All fields are required!";
    }
}

// Close the connection
$conn->close();
?>