/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

// Function to display the saved note text
function displaySavedNoteText() {
    const savedNoteText = WA.state.noteText ?? "";
    console.log("Saved Note Text:", savedNoteText); //Übersicht

    // prüfen ob die eingabe "hallo" ist
    if (savedNoteText.toLowerCase() === "hallo") {
        // wenn ja dann Nachricht in den chat schicken  - in dem Bereich können auch türen geöffnet werden
        WA.chat.sendChatMessage('Hello world', 'Mr Robot');
    }
}


WA.onInit().then(() => {
    console.log('Scripting API ready');

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