import React from 'react'

/**
 * Goal of this file:
 * The purpose of this file is to contail the control panel for the stopwatch, that is all the buttons
 * and the functions associated with them. In this file, the time will be calcualted and sent to StopWatch
 * to be updated in the UI.
 */

// Interface for the props 
interface StopWatchButtonProps {
    updStopwatch: (newInfo: { hours: number; minutes: number; seconds: number }) => void;
    makeLap: (lapsInfo: {}) => void;
    reset: (info: {resetVal: boolean}) => void;
}

// Interface for that data contained inside the lapData
interface lapData{
    lapNumber: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Initializing the global variabls 
var interval: NodeJS.Timeout;
var startTime = 0;
var passedTime = 0;
var pausedTime = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;

var lap = 0;
var lapInfo: lapData[] = [];
var lapActive = false;
var stopActive = false;

export default function StopWatchButton({ updStopwatch, makeLap, reset} : StopWatchButtonProps) {
    
    // This function will start the stopwatch
    const startStopwatch = () => {
        if(!interval){
            startTime = new Date().getTime() - pausedTime;
            // This function is called to calculate the time
            interval = setInterval(setStopwatch, 1000);

            // Showing the lap button
            if(!lapActive){
                document.getElementById('lap-btn').classList.remove('hide');
            }

            if(stopActive){
                stopActive = false;
                var stopBtn = document.getElementById('stop-btn') as HTMLButtonElement
                stopBtn.disabled = false;
            }
        }
    }

    // This function pauses the stopwatch
    const stopStopwatch = () => {
        clearInterval(interval);
        pausedTime = new Date().getTime() - startTime;
        interval = null;
        lapActive = false;
        // Hiding the lap button
        document.getElementById('lap-btn').classList.add('hide');

        var stopBtn = document.getElementById('stop-btn') as HTMLButtonElement
        stopBtn.disabled = true;
        stopActive = true;
    }

    // This function calculates the time and updates the stopwatch
    const setStopwatch = () => {
        var currentTime = new Date().getTime();
        passedTime = currentTime - startTime;

        // Calculating time
        seconds = Math.floor(passedTime / 1000) % 60;
        minutes = Math.floor(passedTime / 60000) % 60;
        hours = Math.floor(passedTime / 3600000);

        // Updating the stopwatch
        updStopwatch({hours, minutes, seconds});
    }

    
    // This function resets the stopwatch to 00:00:00 and updates it
    const resetStopwatch = () => {
        clearInterval(interval);
        interval = null;
        // Reseting the time
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        passedTime = 0;
        pausedTime = 0;
        // Updating the stopwatch
        updStopwatch({hours, minutes, seconds});
        
        // Emptying the lap array
        lapInfo = [];
        lap = 0;

        // Hiding the lap button
        document.getElementById('lap-btn').classList.add('hide');
        lapActive = false;

        var resetVal = true;
        // Setting resetVal to true in order to delete the lap information in the UI
        reset({resetVal})
    }

    // This function records the laps and outputs the lap information in the UI
    const recordLaps = () => {
        lap = lapInfo.length + 1;
        // Popupating the object with lap information
        let data = {
            lapNumber: lap,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        lapInfo.push(data);

        // Sending the updated array so that it gets displayed in the UI
        makeLap({lapInfo});
    }

    return(
        // Creating the panel control UI
        <div className='control-panel-container'>
            <button id='start-btn' onClick={startStopwatch} className='action-btns'>Start</button>
            <button id='stop-btn' onClick={stopStopwatch} className='action-btns'>Stop</button>
            <button id='reset-btn' onClick={resetStopwatch} className='action-btns'>Reset</button>
            <button id='lap-btn' onClick={recordLaps} className='action-btns hide' style={{background: '#5d5db6'}}>Lap</button>
        </div>
    )
}