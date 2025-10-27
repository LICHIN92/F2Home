import React from 'react'
import './buton.css'
const BButton = ({name,Bcolor,color,type,bdrColor,onclick}) => {
  return (
    <div>
        <button type={type} className='bttn' 
        style={{backgroundColor:Bcolor,color:color,borderColor:bdrColor,onclick}}>
            {name}
            </button>
    </div>
  )
}

export default BButton