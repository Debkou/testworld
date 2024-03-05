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

// Function to display the saved note text
function displaySavedNoteText() {
    const savedNoteText = WA.state.noteText ?? "";
    console.log("Saved Note Text:", savedNoteText); //Übersicht

    // prüfen ob die eingabe "hallo" ist
    if (savedNoteText.toLowerCase() === "hallo") {
        // wenn ja dann Nachricht in den chat schicken  - in dem Bereich können auch türen geöffnet werden

        // Tür öffnen
            WA.state.doorState = true;
             WA.state.blockState = true;
    }
}



WA.onInit().then(() => {
    console.log('Scripting API ready');

    displayDoor(WA.state.doorState);

    displayBlock(WA.state.blockState);

           // After load, listen to variable changes to display the correct door image.
     WA.state.onVariableChange('doorState').subscribe((doorState) => {
                // Each time the "doorState" variable changes, call the "displayDoor" function to update the door image visually.
                displayDoor(doorState as boolean);
        });

             WA.state.onVariableChange('blockState').subscribe((blockState) => {
                        // Each time the "doorState" variable changes, call the "displayDoor" function to update the door image visually.
                        displayBlock(blockState as boolean);
                });
    // gespeicherte nachrichten laden
    noteTextArea.value = (WA.state.noteText ?? "") as string;

    // text wird durch klicken gespeichert
    saveButton.addEventListener("click", () => {

        WA.state.noteText = noteTextArea.value;

        // zur Überprüfung wird der gespeicherte text in der console angezeigt
        displaySavedNoteText();
    });


    displaySavedNoteText();
}).catch(e => console.error(e));

export {};