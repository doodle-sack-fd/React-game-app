import React from 'react'
import './error-message.css'
import img from './err.gif'

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt='error'></img>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage  