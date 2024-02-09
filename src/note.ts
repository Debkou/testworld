/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

// Function to display the saved note text
function displaySavedNoteText() {
    const savedNoteText = WA.state.noteText ?? "";
    console.log("Saved Note Text:", savedNoteText);
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    // Load and display the saved note text
    noteTextArea.value = (WA.state.noteText ?? "") as string;

    // Add click event listener to the save button
    saveButton.addEventListener("click", () => {
        // Save the note text in the state
        WA.state.noteText = noteTextArea.value;

        // Display the saved note text in the console
        displaySavedNoteText();
    });

    // Display the saved note text on initialization
    displaySavedNoteText();
}).catch(e => console.error(e));

export {};