import React, { useState } from 'react'
import Inputz from '../../components/input/Inputz'
import './mobileChange.css'
import BButton from '../../components/Button/BButton'
import axios from 'axios'
const MobileChange = () => {
    const [formdata, setFormdata] = useState({})
    const [clicked, setClicked] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleOnchange = (e) => {
        console.log(e.target.value);
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        console.log(formdata);

    }
    const onSubmit = async (e) => {
        // setClicked(true)
            e.preventDefault()
        console.log(formdata);
        
           if (formdata.NewMobile !== formdata.ConfirmMobile) {
            alert("New Mobile and Confirm Mobile do not match!");
            setClicked(false);
            return;
        }
    
        try {
            const res = await axios.post(`${apiUrl}/user/ChangeMobile`, formdata)
            alert(res.data)
        } catch (error) {
            console.log(error);

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