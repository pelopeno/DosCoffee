<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $firstName = trim($_POST['first_name']);
    $lastName = trim($_POST['last_name']);
    $email = trim($_POST['email']);
    $address = trim($_POST['address']);
    $contactNo = trim($_POST['contact_no']);

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check sa db if the username or email already exists
    $checkStmt = $conn->prepare("
        SELECT * FROM tbl_employees 
        WHERE username = ? OR email = ?
    ");
    $checkStmt->bind_param("ss", $username, $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        // check if yung username or email exists
        echo "<script>
            alert('Username or email already exists. Please try again.');
            window.history.back(); // Go back to the registration form
        </script>";
    } else {
        // Insert data nung employees
        $stmt = $conn->prepare("
            INSERT INTO tbl_employees (username, password, first_name, last_name, email, contact_no, address, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ");
        $stmt->bind_param("sssssss", $username, $hashedPassword, $firstName, $lastName, $email, $contactNo, $address);

        if ($stmt->execute()) {
            echo "<script> 
                alert('Registration Successful!');
                window.location.href = '../login.html';     
            </script>";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    }

    $checkStmt->close();
    $conn->close();
}
?>
