import React, { useEffect, useState } from 'react'
import './veiwProfile.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
const ViewProfile = () => {
    const id = useSelector(state => state.user?.user?.id)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [data, setData] = useState({})
    useEffect(() => {
        const profiledata = async () => {
            try {
                const res = await axios.get(`${apiUrl}/viewProfile/${id}`)
                setData(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        profiledata()
    }, [id])
    return (
        <div className='ViewProfile'>

            <div>


                <h1>
                    {data.FirstName} {data.LastName}

                </h1>
                <p>
                    Mobile: {data.Mobile}
                </p>
                <div className='addressLine'>
                    <p>Address:</p>
                    <span>
                        {data.HouseName}
                    </span>
                    <span>
                        {data.Place}
                    </span>
                    <span>
                        {data.Post}
                    </span>
                    <span>
                       PIN: {data.PIN}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ViewProfile