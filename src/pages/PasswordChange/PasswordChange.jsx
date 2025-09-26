import './password.css'
import Inputz from '../../components/input/Inputz'
import BButton from '../../components/Button/BButton'
import { useState } from 'react'

const PasswordChange = () => {
  const [formData,setFormData]=useState({})
  const handleChange = (e) => {
setFormData({...formData,[e.target.name]:e.target.value})
  }
  return (
    <div className='passwordChange'>
      <form >
        <h1>Change Password</h1>
        <div>
          <Inputz
            name={'mobile'} label={'Enter Your Mobile'}  type={'number'}
          onchange={handleChange} value={formData.mobile}
          />
        </div>
        <div>
          <Inputz
            name={'New_Password'} label={'New Password'}
                      onchange={handleChange} value={formData.New_Password }

          />
        </div>
        <div>
          <Inputz
            name={'Confirm_NewPassword'} label={'Confirm Password'}
                   onchange={handleChange} value={formData.Confirm_NewPassword}

         />
        </div>
        <div>
          <BButton name={'Change Password'} />
        </div>
      </form>
    </div>
  )
}

export default PasswordChange