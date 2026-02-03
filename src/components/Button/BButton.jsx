import React from 'react'
import './buton.css'
const BButton = ({ name, Bcolor, color, type, bdrColor, onClick }) => {
  return (
    <div>
      <button type={type} className='bttn'
        style={{ backgroundColor: Bcolor, color: color, borderColor: bdrColor }}
         onClick={onClick}>

        {name}

      </button>
    </div>
  )
}

export default BButton