/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";
import mysql from 'mysql';

console.log('Script started successfully');


async function main() {
    let connection: Connection;

    try {
        // Verbindung zur Datenbank herstellen
        connection = await mysql.createConnection({
            host: 'w0188670.kasserver.com',
            user: 'd04009b1',
            password: 'javapw',
            database: 'd04009b1'
        });

        // Eine einfache Abfrage ausführen
        const [rows, fields] = await connection.execute('SELECT * FROM aufgaben');
        console.log('Abfrageergebnisse:', rows);
    } catch (error) {
        console.error('Fehler beim Ausführen der Abfrage:', error);
    } finally {
        if (connection) {
            // Verbindung schließen, wenn vorhanden
            await connection.end();
            console.log('Datenbankverbindung geschlossen');
        }
    }
}



/**
 * Utility function to display the correct door image depending on the state of the door.
 */
function displayDoor(state: boolean) {
    if (state === true) {
        WA.room.showLayer('dark_mode');
    } else {
        WA.room.hideLayer('dark_mode');
    }
}


// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    main().then(() => {
        console.log('Main-Funktion erfolgreich abgeschlossen');
    }).catch((error) => {
        console.error('Fehler beim Ausführen der Main-Funktion:', error);
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    // Most notably for us, it is used to generate the "Configure the room" menu and to handle the "bell".
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));


    // The doorState variable contains the state of the door.
    // True: the door is open
    // False: the door is closed
    // Upon load, the function bellow is called to initiate the door state.
    displayDoor(WA.state.light);


    // After load, we listen to variable change to display the correct door image.
    WA.state.onVariableChange('doorState').subscribe((doorState) => {
        // Each time the "doorState" variable changes, we call the "displayDoor" function to update the door image visually.
        displayDoor(doorState as boolean);
    });

    let openCloseMessage: ActionMessage | undefined;

    // When someone walks on the doorstep (inside the room), we display a message to explain how to open or close the door
    WA.room.onEnterLayer('visibleLight').subscribe(() => {
        openCloseMessage = WA.ui.displayActionMessage({
            message: "Press 'space' to turn on the light",
            callback: () => {
                WA.state.doorState = false;
            }
        });
    });

    let noteWebsite: any;
    
// starte den Dialog beim Eintritt der Karte

        noteWebsite = await WA.ui.website.open({
            url: "src/dialog_note_test.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });



    WA.room.onLeaveLayer("visibleDialog").subscribe(() => {
        noteWebsite.close();
    });

}).catch(e => console.error(e));

export {};