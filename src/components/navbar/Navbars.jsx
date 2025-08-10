import React, { useState } from 'react'
import './navbar.css'
import { MenuOutlined } from '@ant-design/icons'
import { RiCloseLargeFill } from 'react-icons/ri'
import { CgMenuGridO } from 'react-icons/cg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Navbars = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Run once in case user loads the page in a larger screen with menu open
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <div className="navbarContainer">
      <div className="logo">
        <h1>Fresh2Home</h1>
      </div>
      <button aria-label="Toggle navigation menu" className='toggleMenu'
        onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? <CgMenuGridO size={30} className='menuButton' /> : <RiCloseLargeFill size={30} className='menuButton' />
        }
      </button>
      <ul className={menuOpen ? 'menuActive' : ""}>
        <li onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</li>
        <li onClick={() => { setMenuOpen(false); navigate('/about'); }}>About</li>
        <li onClick={() => { setMenuOpen(false); navigate('/services'); }}>Services</li>
        <li onClick={() => { setMenuOpen(false); navigate('/contact'); }}>Contact</li>
      </ul>

    </div>

  )
}

export default Navbars