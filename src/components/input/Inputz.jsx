import React, { useState } from 'react'
import './inputsz.css'
const Inputz = ({ label, type,value, onblur, onchange, name,required}) => {
   const [isFocused, setIsFocused] = useState(false)

  const isActive = isFocused || value
  return (
     <div className='inputs'>
      <input type={type} name={name}  value={value} onChange={onchange} 
         onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} required={required}/>

      {/* <label htmlFor="">{label}</label> */}
       <label className={isActive ? 'active' : ''}>{label}</label>
    </div>
  )
}

export default Inputz