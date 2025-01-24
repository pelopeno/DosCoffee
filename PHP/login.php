<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch username and password from the form
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Prepare an SQL statement to fetch user details
    $checkStmt = $conn->prepare("SELECT * FROM tbl_employees WHERE username = ?");
    $checkStmt->bind_param('s', $username);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        // Fetch user details
        $user = $result->fetch_assoc();

        // Verify the entered password with the hashed password in the database
        if (password_verify($password, $user['password'])) {
            // Login successful
            echo "<script>
                window.location.href = '../dashboard.html'; // Redirect to the dashboard or another page
            </script>";
        } else {
            // Password doesn't match
            echo "<script>
                alert('Invalid username or password.');
                window.history.back(); // Go back to the login page
            </script>";
        }
    } else {
        // Username doesn't exist
        echo "<script>
            alert('Invalid username or password.');
            window.history.back(); // Go back to the login page
        </script>";
    }

    // Close the statement and connection
    $checkStmt->close();
    $conn->close();
}
?>
