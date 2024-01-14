import React from 'react'
import "./styles.css";
import StopWatch from './StopWatch';

export default function App() {
    return(
        <div  id='main-container'>
            <div className='centered title'>
                <h1>STOPWATCH</h1>
                <StopWatch />
            </div>
        </div>
    )
}