// Basis-URL der Datenguide API:
const BASE_URL = 'https://dummy.restapiexample.com/api/v1/employees'

// Einfache Funktion zur Herunterladen und Anzeigen
// eines Datensatzes im JSON-Format:
function getData(query) {
  return fetch(BASE_URL + '?format=json&' + query)
    .then((response) => response.json())
    .then((result) => {
      console.log('Data:', result.data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

// Beispielhafter Funktionsaufruf für:
// - eine Statistik ('11111' / Gebietsstand)
// - ein Wertmerkmal ('FLC006' / Fläche)
// - eine Region ('11' / Berlin)
getData('data=11111:FLC006&region=11')// JavaScript Document