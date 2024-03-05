<?php
// Verbindung zur Datenbank herstellen
$servername = "localhost";
$username = 'root';
$password = '';
$dbname = "testworld";

// Erstelle eine Verbindung
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfe die Verbindung
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Datenbankabfrage durchführen
$savedNoteText = $_POST['savedNoteText'];
$sql = "SELECT * FROM aufgaben WHERE Loesung = '$savedNoteText'";
$result = $conn->query($sql);

// Überprüfen, ob die Bedingung erfüllt ist
$response = array('isMatch' => false);
if ($result->num_rows > 0) {
    $response['isMatch'] = true;
}

// JSON-Antwort senden
header('Content-Type: application/json');
echo json_encode($response);

// Verbindung schließen
$conn->close();
?>