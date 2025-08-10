import React, { useState } from 'react'
import Inputz from '../../components/input/Inputz'
import './address.css'
import BButton from '../../components/Button/BButton'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../../redux/userSlice'
import { jwtDecode } from 'jwt-decode'
const AddAddress = ({ cancel }) => {
  const [address, setAddress] = useState({})
  const [formData, setFormData] = useState({});
  const user_id = useSelector(state => state.user.user.id)
  console.log(user_id);
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL;
  // const handleOnchange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   // alert(e.target.value)
  // }

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'PIN' ? value : value.toUpperCase() // keep PIN untouched
    });
  };

  const goback = () => {
    cancel(false)
  }
  const submitAddress = async (e) => {
    e.preventDefault()
    console.log(formData);

    for (let key in formData) {
      if (key !== 'PIN' && formData[key]?.length === 1) {
        alert(`${key} should have more than one letter`);
        return; // Stop submission
      }
      if (key === 'PIN' && formData[key]?.length !== 6) {
        alert('Invalid PIN');
        return;
      }
    }

    try {
      const res = await axios.post(`${apiUrl}/user/address/${user_id}`, formData)
         localStorage.setItem('user', res.data.token)
      dispatch(setUserData(jwtDecode(res.data.token))) // ✅ correctly updates Redux
      alert(res.data.message)
      navigate(-1, { replace: true })
    } catch (error) {
      console.log(error);
      alert(error?.response?.data)
    }
  }

  return (
    <div className='address'>
      <form onSubmit={submitAddress}>
        <h1>Add Address</h1>
        <Inputz
          name={'HouseName'}
          label={'House Name'}
          type={'text'}
          onchange={handleOnchange}
          value={formData.HouseName}
          required={true}
        />
        <Inputz
          label={'Place'}
          name={'Place'}
          type={'text'}
          onchange={handleOnchange}
          value={formData.Place}
          required={true}
        />
        <Inputz
          label={'Post'}
          name='Post'
          type='text'
          onchange={handleOnchange}
          value={formData.Post}
          required={true}
        />
        <Inputz
          label={'PIN'}
          name={'PIN'}
          type={'Number'}
          value={formData.PIN}
          onchange={handleOnchange}
          required={true}
        />
        <BButton name={'Submit Address'} type={'submit'} Bcolor={'#456882'} color={'white'} />


        <p onClick={goback}>Go Back</p>

      </form>
    </div>
  )
}

export default AddAddress