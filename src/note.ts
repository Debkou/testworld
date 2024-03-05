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

async function checkDatabase(savedNoteText: string) {
    try {
        const apiUrl = "abfrage.php";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                savedNoteText: savedNoteText,
            }),
        });

        const data = await response.json();

        if (data.isMatch) {
            WA.state.doorState = true;
            WA.state.blockState = true;
        }
    } catch (error) {
        console.error("Fehler beim Abfragen der Datenbank:", error);
    }
}

function displaySavedNoteText() {
    const savedNoteText = WA.state.noteText ?? "";
    console.log("Saved Note Text:", savedNoteText);

    // Überprüfen, ob die Bedingung erfüllt ist
    checkDatabase(savedNoteText);
}

WA.onInit().then(() => {
    // ...

    // text wird durch Klicken gespeichert
    saveButton.addEventListener("click", () => {
        WA.state.noteText = noteTextArea.value;
        displaySavedNoteText();
    });

    // ...
}).catch(e => console.error(e));

export {};