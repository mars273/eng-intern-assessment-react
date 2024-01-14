import React from 'react'

interface StopWatchButtonProps {
    updStopwatch: (newInfo: { hours: number; minutes: number; seconds: number }) => void;
    makeLap: (lapsInfo: {}) => void;
    reset: (info: {resetVal: boolean}) => void;
}

interface lapData{
    lapNumber: number;
    hours: number;
    minutes: number;
    seconds: number;
}

var interval: NodeJS.Timeout;
var startTime = 0;
var passedTime = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;

var pausedTime = 0;
var lap = 0;
var lapInfo: lapData[] = [];

var lapActive = true;

export default function StopWatchButton({ updStopwatch, makeLap, reset} : StopWatchButtonProps) {
    //DONE!
    const startStopwatch = () => {
        if(!interval){
            startTime = new Date().getTime() - pausedTime;
            //this function is called to calculate the time and output it on the screen
            interval = setInterval(setStopwatch, 1000);

            //enable the lap button
            if(!lapActive){
                document.getElementById('lap-btn').classList.remove('hide');
            }
        }
    }

    //DONE!
    const stopStopwatch = () => {
        clearInterval(interval);
        pausedTime = new Date().getTime() - startTime;
        interval = null;
        lapActive = false;
        document.getElementById('lap-btn').classList.add('hide');
    }

    //DONE!
    const setStopwatch = () => {
        var currentTime = new Date().getTime();
        passedTime = currentTime - startTime;

        //converting time
        seconds = Math.floor(passedTime / 1000) % 60;
        minutes = Math.floor(passedTime / 60000) % 60;
        hours = Math.floor(passedTime / 3600000);

        updStopwatch({hours, minutes, seconds});
    }

    
    //DONE!
    const resetStopwatch = () => {
        clearInterval(interval);
        interval = null;
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        passedTime = 0;
        pausedTime = 0;
        updStopwatch({hours, minutes, seconds});
        lapInfo = [];
        lap = 0;
        document.getElementById('lap-btn').classList.add('hide');
        lapActive = false;

        var startBtn = document.getElementById('start-btn') as HTMLButtonElement;
        startBtn.disabled = false;

        var resetVal = true;

        //deleting the lap display
        reset({resetVal})
    }

    const recordLaps = () => {
        lap++;
        let data = {
            lapNumber: lap,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
        lapInfo.push(data);

        makeLap({lapInfo});
    }

    return(
        <div className='control-panel-container'>
            <button id='start-btn' onClick={startStopwatch} className='action-btns'>Start</button>
            <button id='stop-btn' onClick={stopStopwatch} className='action-btns'>Stop</button>
            <button id='reset-btn' onClick={resetStopwatch} className='action-btns'>Reset</button>
            <button id='lap-btn' onClick={recordLaps} className='action-btns'>Lap</button>
        </div>
    )
}