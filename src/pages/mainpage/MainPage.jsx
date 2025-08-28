import React from 'react'
import Navbars from '../../components/navbar/Navbars'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <div>
        <Navbars/>
        <Outlet/>
    </div>
  )
}

export default MainPage