import React from 'react'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import { clearUserData } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const user = useSelector(state => state.user.user)
  console.log(user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOutFun = () => {

    localStorage.removeItem('user');
    dispatch(clearUserData)
    navigate('/login')
  }
  return (
    <div className='profile'>
      <div className='profile_header'>
        <p><FaRegUserCircle /> {user.FirstName}</p>
        <span className='logout' onClick={() => logOutFun()}>Logout</span>
      </div>
    <div>
        <span onClick={() => navigate('/mybooking')}>My Booking</span> 
      </div>

    </div>
  )
}

export default Profile