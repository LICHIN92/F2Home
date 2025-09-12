import React from 'react'
import './logodisplay.css'
import logo from '../../assets/img/logo.png'
const LogoDisplay = () => {
  return (
    <div className='logoDisplay'>
        <img src={logo} alt="" />
    </div>
  )
}

export default LogoDisplay