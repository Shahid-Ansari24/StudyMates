import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import CTAButton from '../../../core/HomePage/Button'
import { updateProfile } from '../../../../services/operation/profileAPI'

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const [personalInformation, setPersonalInformation] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || "",
    dateOfBirth: user?.additionalDetails.dateOfBirth || "",
    gender: user?.gender || 'Prefer not to say',
    contactNumber: user?.additionalDetails.contactNumber || '',
    about :user?.about || '',
  })

  const handleChange = (e) => {    
    setPersonalInformation((prevData) => {
      return {
        ...prevData, 
        [e.target.name]: e.target.value
      }
    })
  }

  const handleReset = () => {
    setPersonalInformation({
      firstName: user?.firstName || '',
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails.dateOfBirth || "",
      gender: user?.gender || 'Prefer not to say',
      contactNumber: user?.additionalDetails.contactNumber || '',
      about :user?.about || '',
    })
  }

  async function handleSave() {
    try {
      const response = await updateProfile(personalInformation, user.token)
      console.log('response--', response);
    } catch (error) {
      console.log("some error occurred while saving--", error);
    }
  }
  
  return (
    <div>
      {console.log("user---", user)}
      <div className='my-5'>
        Personal Information
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <div>
            <label htmlFor="firstName" className='me-3'>First Name</label>
            <input type="text" 
            value={personalInformation.firstName}
            name={'firstName'}
            onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="lastName" className='me-3'>Last Name</label>
            <input type="text" 
            value={personalInformation.lastName}
            name={'lastName'}
            onChange={handleChange}/>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <label htmlFor="DateOfBirth" className='me-2'>Date of Birth</label>
            <input type="date" 
            value={personalInformation.dateOfBirth} 
            onChange={handleChange}
            name='dateOfBirth'/>
          </div>
          <div>
            <label htmlFor="Gender" className='me-2'>Gender</label>
            <select 
            className='w-[26rem]' 
            onChange={handleChange}
            name='gender'>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonBinary">Non Binary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <label htmlFor="contactNumber" className='me-3'>Contact Number</label>
            <input type="number"
            name='contactNumber'
            onChange={handleChange}
            placeholder='Enter Your Contact Number' />
          </div>
          <div>
            <label htmlFor="about" className='me-3'>About</label>
            <input type="text" 
            name='about'
            onChange={handleChange}
            placeholder='Enter About Yourself'/>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-4 mt-4'>
        <CTAButton onClick={handleReset}>
          Cancel
        </CTAButton>
        <CTAButton active={true} onClick={handleSave}>
          Save
        </CTAButton>
      </div>
    </div>
  )
}

export default EditProfile
