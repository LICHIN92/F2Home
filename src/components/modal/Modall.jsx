import React, { useState } from 'react'
import './modal.css'
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modall = ({ close, id }) => {
    const [spin, setSpin] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate=useNavigate()
    const callfun = async () => {
        setSpin(true);

        try {
            const res = await axios.delete(`${apiUrl}/booking/${id}`)
            console.log(res);
            alert(res.data)
            close(false)
            navigate('/mybooking')
        } catch (error) {
            console.log(error);
            alert(error.response.data)
            close(false)
        }
        // do something async here...
        setTimeout(() => setSpin(false), 2000); // reset after 2s
    };

    return (
        <div className='modallcontainer'>
            <div className='modalbox'>
                <h2>Confirm your Cancel</h2>
                <hr />
                <p>Are you sure?</p>
                <hr />
                <div className='buttonBox'>
                    <button onClick={() => close(false)}>Close</button>
                    <button onClick={callfun} disabled={spin}>
                        {spin ? <CgSpinner className='spinner' /> : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modall;


