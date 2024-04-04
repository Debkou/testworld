<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datenbank Anzeige</title>
</head>
<body>

<?php
	 header("Access-Control-Allow-Origin: *");
// Verbindung zur Datenbank herstellen
$servername = "w0188670.kasserver.com"; // Dein Hostname
$username = "d04009b1"; // Dein MySQL-Benutzername
$password = "javapw"; // Dein MySQL-Passwort, falls vorhanden
$database = "d04009b1"; // Der Name deiner Datenbank

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $database);

// Überprüfen, ob die Verbindung erfolgreich war
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage ausführen, um den Inhalt der Tabelle "aufgaben" zu erhalten
$sql = "SELECT * FROM aufgaben";
$result = $conn->query($sql);

// Überprüfen, ob Ergebnisse zurückgegeben wurden
if ($result->num_rows > 0) {
    // Ergebnisse in HTML-Tabelle ausgeben
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Lösung</th></tr>";
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>".$row["id"]."</td><td>".$row["Loesung"]."</td></tr>";
    }
    echo "</table>";
} else {
    echo "Keine Ergebnisse gefunden";
}

// Verbindung schließen
$conn->close();
?>

</body>
</html>