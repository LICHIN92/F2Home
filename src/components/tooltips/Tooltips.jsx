import React from 'react'
import './tooltips.css'

const Tooltips = ({ children, text }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  )
}

export default Tooltips
