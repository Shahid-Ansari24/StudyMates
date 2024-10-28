import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-center font-bold text-4xl mb-3'>
        Get in Touch
      </h1>
      <p className='text-center font-bold text-richblack-300'>
        We'd love to here for you, Please fill out this form
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
