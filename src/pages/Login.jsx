import React from 'react'
import loginImg from '../assets/images/AuthImages/Login.jpg';
import Template from '../components/core/Auth/Template'


const Login = () => {
  return (
    <Template
    title="Welcome Back"
    desc1="Build skills for today, tomorrow, and beyond."
    desc2="Education to future-proof your career."
    image={loginImg}
    formType="login"/>
  )
}

export default Login
