import React from 'react'

const Spinner = ({text = ''}) => {
    return (
        <div>
            {text ? <>Lading <b>{text}</b>...</> : 'Loading...'}
        </div>
    )
}

export default Spinner