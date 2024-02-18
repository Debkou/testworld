<?php
header('Content-Type: application/json');
// Datenbankverbindung herstellen (Sie müssen die tatsächlichen Zugangsdaten einfügen)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testworld";

$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen Sie die Verbindung
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Benutzereingabe erhalten
$userInput = $_POST['userInput'];

// SQL-Abfrage ausführen
$sql = "SELECT * FROM aufgaben WHERE Loesung = '$userInput'";
$result = $conn->query($sql);

// Überprüfen, ob die Lösung gefunden wurde
if ($result->num_rows > 0) {
    echo json_encode(["valid" => true]);
} else {
    echo json_encode(["valid" => false]);
}

// Verbindung schließen
$conn->close();
?>