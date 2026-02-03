import React, { useEffect, useState } from 'react'
import './mybooking.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
const MyBooking = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const id = useSelector(state => state.user?.user?.id)
    const [myOrder, setOrder] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${apiUrl}/user/booking/${id}`) 
                setOrder(res.data)
                // console.log(res.data); 

            } catch (error) {

            }
        }
        fetch()
    }, [id])

    return (
        <div className='MyBooking'>
            <h1>My Booking</h1>
            {myOrder.length > 0 ? (
                <div className='bookings'>
                    {myOrder.map((file, index) => (
                        <div className='bookedCard' key={index} onClick={() => { navigate('/showOrCancel', { state: { data: file } }) }} >
                            {file?.BookedItem ?
                                <div className='BookedImage'>
                                    <img src={file?.BookedItem?.Pic} alt="" />
                                </div> :
                                null
                            }

                            <div>

                                <span>
                                    {file?.BookedItem?.Name}
                                </span>
                                <span className='price'>
                                    <LuIndianRupee />
                                    {file.Price}/-
                                </span>
                                <span>{file.Quantity >= 1000 ? file.Quantity / 1000 : file.Quantity}
                                    {file.Quantity >= 1000 ? " Kg" : ' g'}
                                </span>

                            </div>
                        </div>
                    ))}
                </div>
            )
                :
                <p className='messagePara' >You don't have any new bookings</p> }
        </div>
    )
}

export default MyBooking