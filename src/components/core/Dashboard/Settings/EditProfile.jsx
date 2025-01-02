import React, {useState} from 'react'
import { useSelector } from 'react-redux'

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const [personalInformation, setPersonalInformation] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.additionalDetails.dateOfBirth || null,
    gender: user.gender || 'Prefer not to say',
  })

  const handleChange = (e) => {
    const name = e.target.name;
    // setPersonalInformation()
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
            <select className='w-[26rem]'>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonBinary">Non Binary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
