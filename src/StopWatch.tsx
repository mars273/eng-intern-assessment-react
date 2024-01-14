import React, {useState} from 'react'
import StopWatchButton from './StopWatchButton'

interface stopwatchInfo {
    hours: number;
    minutes: number;
    seconds: number;
}

interface lapsInfo {
    lapInfo: lapData[];
}

interface lapData {
    lapNumber: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface resetValue{
    resetVal: boolean;
}

export default function StopWatch() {

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
        console.log(resetValue)

        if(resetValue){
            var laps = document.getElementsByClassName('record-info');
            for(var i = 0; i < laps.length; i++){
                laps[i].innerHTML = '';
            }
        }
    }

    return(
        <div className='container'>

            <div id='stopwatch-container'>
                {String(stopwatchInfo.hours).padStart(2, '0')}<span>:</span>
                {String(stopwatchInfo.minutes).padStart(2, '0')}<span>:</span>
                {String(stopwatchInfo.seconds).padStart(2, '0')}
            </div>

            <StopWatchButton updStopwatch={updStopwatch} makeLap={makeLap} reset={reset}/>

            <div id='lap-records'>
               {lapInfo.map((info, key) => {

                return(
                    <div className='record' key={key}>
                        <div className='record-info'>
                            <h5>Lap #: {info.lapNumber}</h5>
                            <h5>Time: {String(info.hours).padStart(2, '0')}:{String(info.minutes).padStart(2, '0')}:{String(info.seconds).padStart(2, '0')}</h5>
                        </div>
                    </div>
                )
               })}
            </div>

        </div>
    )
}