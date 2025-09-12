import React, { useEffect, useState } from 'react'
import Navbars from '../../components/navbar/Navbars'
import { Outlet } from 'react-router-dom'
import LogoDisplay from '../../components/logoDisplay/LogoDisplay'

const MainPage = () => {
  const [logos, setLogos] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLogos(false)
    }, 5000)
  }, [])
  return (
    <div>
      <Navbars />
      {logos && <LogoDisplay />}

      <Outlet />
    </div>
  )
}

export default MainPage