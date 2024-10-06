import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {login} from '../../../services/operation/authAPI'


const LoginForm = () => {

    const [formData, setFormData] = useState( {
        email: "", password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate))
        toast.success("Logged In")
        navigate("/Dashboard")
    }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
            <p>Email Address <span className='star'>*</span></p>
            <input required
            type="email"
            value={formData.email} 
            onChange={changeHandler}
            placeholder='Enter email id'
            name='email'/>
        </label>

        <label className='password-label'>
            <p>Password <span className='star'>*</span></p>
            <input required
            type={showPassword ? ('text') : ('password')}
            value={formData.password} 
            onChange={changeHandler}
            placeholder='Enter Password'
            name='password'/>

            <span onClick={() => setShowPassword((prev) => !prev)} className='login-eye'>
                {showPassword ? (<AiOutlineEye className='login-eye-i'/>) : (<AiOutlineEyeInvisible className='login-eye-i'/>)}
            </span>

            <Link to='/forgot-password'>
                <p className='login-forget'>Forget Password</p>
            </Link>
        </label>

        <button className='sign-in' type='submit'>
            Sign In
        </button>

      </form>
    </div>
  )
}

export default LoginForm
