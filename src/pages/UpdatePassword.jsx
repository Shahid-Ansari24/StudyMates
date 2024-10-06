import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { resetPassword } from '../services/operation/authAPI';


const UpdatePassword = () => {

  const dispatch = useDispatch();
  const location = useLocation();

    const {loading} = useSelector( (state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    })
    const {password, confirmPassword} = formData;

    function handleOnChange(event) {
      setFormData( (prevData) => ({
        ...prevData, 
        [event.target.name] : event.target.value
      }))
    } 

    const handleOnSubmit = async( event ) => {
      event.preventDefault();
      const token = location.pathname.split('/').at(-1);
      dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div className='text-white'>
      {
        loading ? (
            <div>
                Loading...
            </div>
        ) : (
            <div>
                <h1>Choose new Password</h1>
                <p>Almost done, Enter your new password and you're all set.</p>
                <form onSubmit={handleOnSubmit}>

                  <label>
                    <p>New Password*</p>
                    <input required
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder='password'
                    className='w-full p-6 bg-richblack-600 text-richblack-5'/>

                    <span onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/> }
                    </span>
                  </label>

                  <label>
                    <p>Confirm New Password*</p>
                    <input required
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    password='confirm password'
                    className='w-full p-6 bg-richblack-600 text-richblack-5'/>

                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      {showConfirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                    </span>
                  </label>

                  <button type='submit'>
                    Reset Password
                  </button>
                </form>
                <div>
                  <Link to='/login'>
                    Back to Login
                  </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
