import React from 'react'
import "./styles.css"; // Custom-made styles were included to enhance UI and UX
import StopWatch from './StopWatch';

/**
 * Goal of this file:
 * The purpose of this file is to display a fully functional stopwatch component on the screen
 */

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