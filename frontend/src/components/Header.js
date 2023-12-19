import React from 'react';
import logo from '../images/logo.png'
import './style.css'

function Header() {
    return(
       <header>
        <img src={logo} alt="Yoga Class Logo" className='logo' />
        <p className='h1'>YogGuru Admission Form</p>
       </header>
    )
}

export default Header