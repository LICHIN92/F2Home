import React, { useState } from 'react'
import './use.css'
import Inputz from '../../components/input/Inputz'
import BButton from '../../components/Button/BButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { setUserData } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
const UserLogin = () => {
  const [formData, setFormData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [isLogin, setLogin] = useState(true)
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
const dispatch=useDispatch()
  const goback = () => {
    console.log(window.history.length)
  }
  const handleOnchange = (e) => {
    console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const LoginhandleOnchange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const reduxfunctions = async () => {
    const user = localStorage.getItem('user')
          dispatch(setUserData(jwtDecode(user))) // ✅ correctly updates Redux
    
    navigate(-1, { replace: true })

  }

  const LoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/user/login`, loginData);
      console.log(response);
      alert(response.data.message)
      localStorage.setItem('user', response.data.token)
      reduxfunctions()
    } catch (error) {
      console.log(error.response.data);


    }
  }
  const SignupSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);

    try {
      const response = await axios.post(`${apiUrl}/user`, formData);
      console.log(response);
      alert(response.data.message)
      localStorage.setItem('user', response.data.token)
      reduxfunctions()
    } catch (error) {
      console.log(error.response.data);

    }
  }
  return (
    <div className='userLogin'>
      <form onSubmit={isLogin ? LoginSubmit : SignupSubmit}>
        <h1>{isLogin ? 'Login' : 'Sign in'}</h1>

        {
          isLogin ?
            <>
              <div>
                <Inputz
                  name="UserMobile"
                  type="text"
                  label="Enter Your Mobile"
                  value={loginData.UserMobile || ''}
                  onchange={LoginhandleOnchange}
                  required={true}
                />
              </div>
              <div>
                <Inputz
                  name="UserPassword"
                  type="password"
                  label="Password"
                  value={loginData.UserPassword || ''}
                  onchange={LoginhandleOnchange}
                  required={true}
                />
              </div>
            </>
            :
            <>
              <div>
                <Inputz label={'First Name'} name={'FirstName'} type={'text'}
                  value={formData.FirstName}
                  onchange={handleOnchange} />
              </div>
              <div>
                <Inputz label={'Last Name'} name={'LastName'} type={'text'}
                  value={formData.LastName} onchange={handleOnchange} />
              </div>
              <div>
                <Inputz label={'Mobile'} name={"Mobile"} type={'number'}
                  value={formData.Mobile} onchange={handleOnchange} />
              </div>
              <div>
                <Inputz label={"Password"} name={"Password"} type={'text'}
                  value={formData.Password} onchange={handleOnchange} />
              </div>
              <div>
                <Inputz label={"Confirm Password"} name={'ConfirmPassword'} type={'text'}
                  value={formData.ConfirmPassword} onchange={handleOnchange} />
              </div>
            </>
        }
        <div className='submitButton'>
          <BButton name={isLogin ? "Login" : "Sign up"} Bcolor={'#471396'} color={'white'} type={'submit'} />
        </div>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={() => setLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
        <p className='goback' onClick={() => navigate(-1, { replace: true })}>go back</p>

      </form>
    </div>
  )
}

export default UserLogin