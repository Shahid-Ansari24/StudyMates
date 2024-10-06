import React from 'react'
import frameImage from '../../../assets/images/AuthImages/Frame.png'
import frameImage2 from '../../../assets/images/AuthImages/background-frame.jpg'
import LoginForm from './LoginForm'
import SignUpForm from './SignupForm'
import { FcGoogle } from "react-icons/fc";

const Template = ({title, desc1, desc2, image, formType}) => {
  return (
    <div className='templateDiv'>
      
      <div className='templateLeft'>
        <h1 className='templateTitle'>{title}</h1>
        <p>
          <span className='desc1'>{desc1}</span>
          <span className='desc2'>{desc2}</span>
        </p>

        {formType === 'signup' ?
        (<SignUpForm/>) :
        (<LoginForm/>)}


        <div className='or'>
          <div className='orLine'></div>
          <div className='orName'>OR</div>
          <div className='orLine'></div>
        </div>

        <button className='login-button'>
          <FcGoogle className='login-google'/>
          <p>Sign Up with Google</p>
        </button>

      </div>

      
      <div className='templateRight'>
        <img src={frameImage2} alt="Pattern" width={558} height={584} loading='lazy'/>
        <img src={image} alt="Students" width={558} height={584} loading='lazy' className='image'/>
      </div>

    </div>
  )
}

export default Template
