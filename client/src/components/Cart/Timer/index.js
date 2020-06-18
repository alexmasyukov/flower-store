import React, { useState, useEffect } from 'react'

const Timer = ({ maxSeconds = 3, onTimeEnd = () => {} }) => {
    const [seconds, setSeconds] = useState(maxSeconds)
    const [isActive, setIsActive] = useState(false)

    // function toggle() {
    //     setIsActive(!isActive)
    // }

    // function reset() {
    //     setSeconds(60)
    //     setIsActive(false)
    // }

    useEffect(() => {
        let interval = null
        // if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1)
            }, 1000)
        // } else if (!isActive && seconds !== 0) {
            if (seconds === 1) {
                clearInterval(interval)
                onTimeEnd()
            }
        // }s
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <div>
            {/* <div className="time"> */}
            {seconds}
            {/* </div> */}
            {/* <div className="row"> */}
            {/* <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="button" onClick={reset}>
                    Reset
                </button> */}
            {/* </div> */}
        </div>
    )
}

export default Timer