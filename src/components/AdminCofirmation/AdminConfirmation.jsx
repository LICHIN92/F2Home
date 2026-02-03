import React, { useState } from 'react'
import './adminconfirmation.css'
import { CgSpinner } from 'react-icons/cg';

const AdminConfirmation = ({ heading, fun1, id, cancel, quotes }) => {
    const [spin, setSpin] = useState(false);

    return (
        <div className=' adminComfirmation'>

            <div className='adminModal'>
                <h2>{heading}</h2> <hr className='lines' />
                <p>{quotes}</p>
                <hr  className='lines'/>
                <div>


                    <button onClick={() => { cancel(false) }}>Cancel</button>
                    <button onClick={() => {setSpin(true), fun1(id) }}>
                        {spin ? <CgSpinner className='spinner' /> : "Continue"}

                    </button>

                </div>
            </div>
        </div >
    )
}

export default AdminConfirmation