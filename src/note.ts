/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    noteTextArea.value = (WA.state.noteText ?? "") as string;
    saveButton.addEventListener("click", () => {
        WA.state.noteText = noteTextArea.value;
    });

}).catch(e => console.error(e));

export {};
