import React from 'react'
import signupImg from '../assets/images/AuthImages/signUp.jpg';
import Template from '../components/core/Auth/Template';

const SignUp = () => {
  return (
    <Template
    title="Join the millions learning to code with StudyNotion for free."
    desc1="Build skills for today, tomorrow, and beyond."
    desc2="Education to future-proof your career."
    image={signupImg}
    formType="signup"/>
  )
}

export default SignUp
