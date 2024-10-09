import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slice/authSlice';
import { sendOtp } from '../../../services/operation/authAPI';

const SignUpForm = () => {

  const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        firstName: '', lastName: "", email: '', password: '', confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [createPassword, setCreatePassword] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("Student");

    const navigate = useNavigate();


    function changeHandler(event) {
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    } 

    function submitHandler(event) {
      event.preventDefault();
      if(formData.password != formData.confirmPassword) {
        toast.error("Password do not match")
        return;
      }

      const finalData = {
        ...formData,
        accountType
      }

      dispatch(setSignupData(finalData));
      dispatch(sendOtp(formData.email, navigate))

      navigate("/verify-email");
    }

  return (
    <div className='signUp-div'>

      {/* student-Instructor tab */}
      <div className='signUp-buttons'>
        <button onClick={() => setAccountType("Student")} className={accountType === 'Student' ? ('buttonStudent') : ('buttonStudentCancel')}>
          Student
        </button>
        <button onClick={() => setAccountType("Instructor")} className={`${accountType === 'Instructor' ? ('buttonInstructor') : ('buttonInstructorCancel')}`}>
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className='signUp-form'>

        {/* First Name and Last Name */}
        <div className='signUpName'>

            <label className='signUpName-label'>
            <p>First Name <sup className='star'>*</sup></p>
            <input required
            type="text"
            name='firstName'
            onChange={changeHandler}
            placeholder='Enter First Name'
            value={formData.firstName} />
            </label>

            <label className='signUpName-label'>
            <p>Last Name <sup className='star'>*</sup></p>
            <input required
            type="text"
            name='lastName'
            onChange={changeHandler}
            placeholder='Enter Last Name'
            value={formData.lastName} />
            </label>

        </div>

        {/* Email Address */}
        <label>
            <p>Email Address <sup className='star'>*</sup></p>
            <input required
            type="email"
            name='email'
            onChange={changeHandler}
            placeholder='Enter Email Address'
            value={formData.email} />
        </label>

        {/* createPassword and confirm Password */}
        <div className='signUp-Password'>
            <label className='signup-password-label'>
                <p>Create Password <sup className='star'>*</sup></p>
                <input required
                type={createPassword ? ('text') : ('password')}
                name='password'
                onChange={changeHandler}
                placeholder='Enter Password'
                value={formData.password} />
                <span onClick={() => setCreatePassword((prev) => !prev)} className='signUp-eye'>
                    {createPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)}
                </span>
            </label>

            <label className='signup-password-label-2'>
                <p>Confirm Password <sup className='star'>*</sup></p>
                <input required
                type={confirmPassword ? ('text') : ('password')}
                name='confirmPassword'
                onChange={changeHandler}
                placeholder='Confirm Password'
                value={formData.confirmPassword} />
                <span onClick={() => setconfirmPassword((prev) => !prev)} className='signUp-eye-2'>
                    {confirmPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)}
                </span>
            </label>
        </div>  

        <button className='createAccount'>
            Create Account
        </button>

      </form>

    </div>
  )
}

export default SignUpForm
