import './password.css'
import Inputz from '../../components/input/Inputz'
import BButton from '../../components/Button/BButton'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PasswordChange = () => {
  const [formData, setFormData] = useState({})
    const navigate=useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    console.log(formData)

    e.preventDefault()
    if (formData.mobile.length !== 10) {
      alert('Please enter your 10-digit mobile number')
      return
    }
    if (formData.New_Password.length < 6) {
      alert('Password length must be at least 6 characters')
      return
    }
    if (formData.Confirm_NewPassword !== formData.New_Password) {
      alert('Confirm Password does not match the New Password')
      return
    }
    try {
      const res = await axios.post(`${apiUrl}/user/changePassword`, formData)
      // console.log(res.data);
      alert(res.data)
navigate(-1)
    } catch (error) {
      alert(error.response.data)
      // console.log(error);

    }
  }
  return (
    <div className='passwordChange'>
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        <div>
          <Inputz
            name={'mobile'} label={'Enter Your Mobile'} type={'number'}
            onchange={handleChange} value={formData.mobile} required={true}
          />
        </div>
        <div>
          <Inputz
            name={'New_Password'} label={'New Password'}
            onchange={handleChange} value={formData.New_Password} required={true}

          />
        </div>
        <div>
          <Inputz
            name={'Confirm_NewPassword'} label={'Confirm Password'}
            onchange={handleChange} value={formData.Confirm_NewPassword}

          />
        </div>
        <div>
          <BButton name={'Change Password'} type={'submit'} />
        </div>
      </form>
    </div>
  )
}

export default PasswordChange