import React from 'react'
import './Admin.css'
import { useNavigate } from 'react-router-dom'
const Adminn = () => {
    const navigate=useNavigate()
    return (
        <div className='admin'>
            <h1>Admin Dashboard</h1>
            <div className="adminOptions">
                <div className='adminControl' onClick={()=>navigate('/orders')}>
                    Order
                </div>
                <div className='adminControl' onClick={()=>navigate('/editItem')}>
                    Edit item 
                </div>
                <div className='adminControl' onClick={()=>navigate('/editProduct')}>
                    Edit Product
                </div>
                <div className='adminControl' onClick={()=>navigate('/users')}>
                    Users
                </div>

            </div>
        </div>
    )
}

export default Adminn