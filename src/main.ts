/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

/**
 * Utility function to display the correct door image depending on the state of the door.
 */
function displayDoor(state: boolean) {
    if (state === true) {
        WA.room.showLayer('door/door_opened');
        WA.room.hideLayer('door/door_closed');
    } else {
        WA.room.hideLayer('door/door_opened');
        WA.room.showLayer('door/door_closed');
    }
}

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');

     let noteWebsite: any;

        WA.room.onEnterLayer("visibleNote").subscribe(async () => {
            console.log("Entering visibleNote layer");

            noteWebsite = await WA.ui.website.open({
                url: "./note.html",
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

        });

        WA.room.onLeaveLayer("visibleNote").subscribe(() => {
            noteWebsite.close();
        });

    }).catch(e => console.error(e));


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    // Most notably for us, it is used to generate the "Configure the room" menu and to handle the "bell".
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));


    // The doorState variable contains the state of the door.
    // True: the door is open
    // False: the door is closed
    // Upon load, the function bellow is called to initiate the door state.
    displayDoor(WA.state.doorState);

    // After load, we listen to variable change to display the correct door image.
    WA.state.onVariableChange('doorState').subscribe((doorState) => {
        // Each time the "doorState" variable changes, we call the "displayDoor" function to update the door image visually.
        displayDoor(doorState as boolean);
    });

    let openCloseMessage: ActionMessage | undefined;

    // When someone walks on the doorstep (inside the room), we display a message to explain how to open or close the door
    WA.room.onEnterLayer('doorsteps/inside_doorstep').subscribe(() => {
        openCloseMessage = WA.ui.displayActionMessage({
            message: "Press 'space' to open/close the door",
            callback: () => {
                WA.state.doorState = !WA.state.doorState;
            }
        });
    });

    // When someone leaves the doorstep (inside the room), we remove the message
    WA.room.onLeaveLayer('doorsteps/inside_doorstep').subscribe(() => {
        if (openCloseMessage !== undefined) {
            openCloseMessage.remove();
        }
    });
}).catch(e => console.error(e));

export {};