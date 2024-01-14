import React, {useState} from 'react'
import StopWatchButton from './StopWatchButton'

/**
 * Goal of this file:
 * The purpose of this file is to display the stopwatch itself.
 * This file will be receiving data from the stopWatchButton component and updating the stopwatch.
 */


// Interface for the stopwatch information that will be updated
interface stopwatchInfo {
    hours: number;
    minutes: number;
    seconds: number;
}

// Interface for the array that will contain lap data
interface lapsInfo {
    lapInfo: lapData[];
}

// Interface for the object which will contain lap data
interface lapData {
    lapNumber: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Interface for the value which will determine if the reset button was clicked
interface resetValue{
    resetVal: boolean;
}

export default function StopWatch() {

    // useStates to track the stopwatch
    const [stopwatchInfo, setStopwatchInfo] = useState({hours: 0, minutes: 0, seconds: 0});
    const [lapInfo, setLapInfo] = useState<lapData[]>([]);
    const [resetValue, setResetValue] = useState({resetVal: false});


    const updStopwatch = (info : stopwatchInfo) => {
        setStopwatchInfo(info);
    }

    const makeLap = (lapsData: lapsInfo) => {
        setLapInfo(lapsData.lapInfo)
    }

    const reset = (resetValue: resetValue) => {
        setResetValue(resetValue);

        // If the reset button was clicked, empty the lapInfo (nothing will be displayed)
        if(resetValue){
            setLapInfo([]);
        }
    }

    return(
        <div className='container'>

            {/* UI for the stopwatch*/}
            <div id='stopwatch-container'>
                {String(stopwatchInfo.hours).padStart(2, '0')}<span>:</span>
                {String(stopwatchInfo.minutes).padStart(2, '0')}<span>:</span>
                {String(stopwatchInfo.seconds).padStart(2, '0')}
            </div>

            <StopWatchButton updStopwatch={updStopwatch} makeLap={makeLap} reset={reset}/>

            <div id='lap-records'>
               {lapInfo.map((info, key) => {

                return(
                    <div className='record' key={key} id={String(key)}>
                        <div className='record-info'>
                            <h5 id='lap-number'>Lap #: {info.lapNumber}</h5>
                            <h5 id='lap-time'>Time: {String(info.hours).padStart(2, '0')}:{String(info.minutes).padStart(2, '0')}:{String(info.seconds).padStart(2, '0')}</h5>
                        </div>
                    </div>
                )
               })}
            </div>

        </div>
    )
}