/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

function displayDoor(state: boolean) {
    if (state === true) {
        WA.room.showLayer('dark_mode');
    } else {
        WA.room.hideLayer('dark_mode');
    }
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

      bootstrapExtra().then((result) => {
              console.log('Scripting API Extra ready');
              // Überprüfe, ob der Rückgabewert von bootstrapExtra() vom Typ "boolean" ist, bevor du ihn displayDoor() übergibst
              if (typeof result === 'boolean') {
                  displayDoor(result);
              } else {
                  console.error('Fehler: Das Ergebnis von bootstrapExtra() ist nicht vom erwarteten Typ "boolean"');
              }
          }).catch(e => console.error(e));

            displayDoor(WA.state.light);

    WA.state.onVariableChange('light').subscribe((light) => {
        // Each time the "doorState" variable changes, we call the "displayDoor" function to update the door image visually.
        displayDoor(light as boolean);
    });

    noteTextArea.value = (WA.state.dialogText ?? "") as string;
    saveButton.addEventListener("click", () => {
        WA.state.dialogText = noteTextArea.value;
        // Check if the input in noteTextArea is equal to "hallo"
        if (noteTextArea.value.trim().toLowerCase() === "hallo") {
            WA.state.light = false;
        } else {
            console.log("Die eingabe war nciht korrekt - versuche es erneut");
        }
    });

}).catch(e => console.error(e));

export {};