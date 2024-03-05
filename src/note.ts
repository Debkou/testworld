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
        const apiUrl = "src/abfrage.php";

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

    // prüfen ob die eingabe "hallo" ist
    if (savedNoteText.toLowerCase() === "hallo") {
        // wenn ja, dann Nachricht in den Chat schicken - in dem Bereich können auch Türen geöffnet werden
        WA.state.doorState = true;
        WA.state.blockState = true;
    }
}

WA.onInit().then(() => {
    console.log('Scripting API ready');

    displayDoor(WA.state.doorState);

    displayBlock(WA.state.blockState);

    WA.state.onVariableChange('doorState').subscribe((doorState) => {
        displayDoor(doorState as boolean);
    });

    WA.state.onVariableChange('blockState').subscribe((blockState) => {
        displayBlock(blockState as boolean);
    });

    noteTextArea.value = (WA.state.noteText ?? "") as string;

    saveButton.addEventListener("click", () => {
        WA.state.noteText = noteTextArea.value;
        displaySavedNoteText();
    });

    displaySavedNoteText();
}).catch(e => console.error(e));

export {};