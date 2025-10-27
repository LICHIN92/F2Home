import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import './detailbook.css'
import ConfirmBooking from '../ConfirmBooking/ConfirmBooking'
import Modall from '../../components/modal/Modall';
const DetailBookCancel = () => {
    const location = useLocation();
    const { data } = location.state || {};
    console.log(data)
    const [opened, setOpen] = useState(false)
    const datefun = () => {
        let a = data.createdAt
        let dateObj = new Date(a);

        console.log(dateObj.toString().split(' ')[3]);
        return dateObj.toDateString()
    }
    return (
        <div className='detailBookedCancel'>
            {opened && <Modall close={setOpen} id={data._id} />}
            <img src={data.BookedItem?.Pic} alt="kk" />
            <p>{data.BookedItem.Name}</p>
            <p>
                {data.Quantity > 1000 ? data.Quantity / 1000 : data.Quantity}
                {data.Quantity > 1000 ? 'Kg' : 'g'}
            </p>
            <p>Amount: {data.Price}/-</p>
            <p>{datefun(data.createdAt)}</p>
            <span className='cancelButton' onClick={() => setOpen(true)} > Cancel</span>
        </div>
    )
}

export default DetailBookCancel