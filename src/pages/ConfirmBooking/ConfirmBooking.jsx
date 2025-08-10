import React from 'react'
import './Confim.css'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ConfirmBooking = ({ selectedQuantity, Price, image, cancel, Id, refresh }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const user = useSelector((state) => state.user.user)
    console.log(user.id);
    const data = { SelectedQuantity: selectedQuantity, Price: Price, Id: Id, User: user.id }
    const navigate = useNavigate()
    const Confirm = async () => {

        try {
            const res = await axios.post(`${apiUrl}/booking`, data)
            console.log(res.data);
            navigate(-1, { replace: true })
            alert(res.data)

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='ConfirmBooking'>

            <div className='confirmBox'>
                <img src={image} alt="image of pic" />
                <p>
                    Selected Quantity:{selectedQuantity > 1000 ? selectedQuantity / 1000 : selectedQuantity}
                    {selectedQuantity > 1000 ? 'Kg' : 'g'}
                </p>
                <p>Price:  <LiaRupeeSignSolid />{Price}/-</p>
                <button onClick={() => Confirm()}>Confirm Booking</button>
                <button onClick={() => { refresh(prev => !prev), cancel(false) }}>Cancel</button>
            </div>

        </div>
    )
}

export default ConfirmBooking