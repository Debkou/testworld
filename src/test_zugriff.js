import mysql from 'mysql';

// Konfigurationsdaten für die Verbindung zur MySQL-Datenbank
const connection = mysql.createConnection({
  host: 'w0188670.kasserver.com',
  user: 'd04009b1',
  password: 'javapw',
  database: 'd04009b1'
});

// Herstellen der Verbindung zur Datenbank
connection.connect((err) => {
  if (err) {
    console.error('Fehler beim Verbinden zur Datenbank: ' + err.stack);
    return;
  }
  console.log('Verbunden als ID ' + connection.threadId);
});

// Ausführen einer SQL-Abfrage
connection.query('SELECT * FROM aufgaben', (err, rows) => {
  if (err) {
    console.error('Fehler bei der Abfrage: ' + err.stack);
    return;
  }
  console.log('Datensätze abgerufen:');
  console.log(rows);
});

// Schließen der Verbindung zur Datenbank
connection.end((err) => {
  if (err) {
    console.error('Fehler beim Schließen der Verbindung: ' + err.stack);
    return;
  }
  console.log('Verbindung geschlossen.');
});// JavaScript Document