import React, { useState } from 'react'
import Inputz from '../../components/input/Inputz'
import './mobileChange.css'
import BButton from '../../components/Button/BButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const MobileChange = () => {
    const [formdata, setFormdata] = useState({})
    const [clicked, setClicked] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const handleOnchange = (e) => {
        console.log(e.target.value);
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        console.log(formdata);

    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (clicked) {
            return
        };
        setClicked(true)
        // console.log(formdata);

        if (formdata.NewMobile !== formdata.ConfirmMobile) {
            alert("New Mobile and Confirm Mobile do not match!");
            setClicked(false);
            return;
        }

        try {
            const res = await axios.patch(`${apiUrl}/user/changeMobile`, formdata)
            alert(res.data)
            navigate('/profile')

        } catch (error) {
            // console.log(error);
            setClicked(false)
            alert(error.response.data)
        }
    }
    return (
        <div className='mobileChange'>
            <div className='mobileBox'>
                <form onSubmit={onSubmit}>
                    <h1>Change Mobile</h1>
                    <div>
                        <Inputz label={'Enter Your Mobile'} name={'Mobile'} value={formdata.Mobile}
                            onchange={handleOnchange} required={'true'} />
                    </div>
                    <div>
                        <Inputz name={'NewMobile'} label='New Mobile'
                            onchange={handleOnchange} value={formdata.NewMobile}
                            required={'true'} />
                    </div>
                    <div>
                        <Inputz label={'Confirm Mobile'} name={'ConfirmMobile'}
                            onchange={handleOnchange} value={formdata.ConfirmMobile}
                            required={'true'} />
                    </div>
                    <div>
                        <BButton name={clicked ? "Please Wait" : 'Change'} Bcolor={'violet'} type={'submit'} />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default MobileChange