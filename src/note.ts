/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

function displayDoor(state: boolean) {
    if (state === true) {
        WA.room.showLayer('door/door_opened');
        WA.room.hideLayer('door/door_closed');
    } else {
        WA.room.hideLayer('door/door_opened');
        WA.room.showLayer('door/door_closed');
    }
}

function displayBlock(state: boolean) {
    if (state === true) {
        WA.room.hideLayer('block/blockFeld');
    } else {
        WA.room.showLayer('block/blockFeld');
    }
}

// Funktion, um die Lösung in der Datenbank zu überprüfen
async function checkSolutionInDatabase(userInput: string): Promise<boolean> {
    const response = await fetch('datenbank.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userInput=${encodeURIComponent(userInput)}`,
    });

    const result = await response.json();
    return result.valid;
}

// Funktion zum Anzeigen des gespeicherten Notiztextes
async function displaySavedNoteText() {
    const savedNoteText = WA.state.noteText ?? "";
    console.log("Saved Note Text:", savedNoteText);

    // Überprüfen, ob die Lösung in der Datenbank vorhanden ist
    const isValidSolution = await checkSolutionInDatabase(savedNoteText.toLowerCase());

    if (isValidSolution) {
        // Wenn die Lösung gültig ist, Tür und Block öffnen
        WA.state.doorState = true;
        WA.state.blockState = true;
    } else {
        // Andernfalls Tür und Block schließen
        WA.state.doorState = false;
        WA.state.blockState = false;
    }
}

WA.onInit().then(() => {
    console.log('Scripting API ready');

    displayDoor(WA.state.doorState);
    displayBlock(WA.state.blockState);

    // Nach dem Laden auf Variablenänderungen hören, um das richtige Türbild anzuzeigen.
    WA.state.onVariableChange('doorState').subscribe((doorState) => {
        displayDoor(doorState as boolean);
    });

    WA.state.onVariableChange('blockState').subscribe((blockState) => {
        displayBlock(blockState as boolean);
    });

    // Gespeicherte Nachrichten laden
    noteTextArea.value = (WA.state.noteText ?? "") as string;

    // Text wird durch Klicken gespeichert
    saveButton.addEventListener("click", () => {
        WA.state.noteText = noteTextArea.value;

        // Zur Überprüfung wird der gespeicherte Text in der Konsole angezeigt
        displaySavedNoteText();
    });

    displaySavedNoteText();
}).catch(e => console.error(e));

export {};
