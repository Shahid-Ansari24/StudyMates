import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { FaRegEdit } from "react-icons/fa";


const MyProfile = () => {
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <div className='text-white'>
      <h1 className='font-bold text-3xl mb-10'>
        My Profile
      </h1>

      {/* section 1 */}
      <div className='flex justify-between bg-richblack-800 border-2 border-white py-7 px-10'>
        <div className='flex gap-2 items-center'>
          <img src={user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[70px] rounded-full object-cover' />
          <div>
            <p className='font-bold text-[1.5rem]'>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <IconBtn 
          text="Edit"
          onClick={() => {
            navigate("/Dashboard/Settings")
          }}
          customClasses="flex justify-center items-center gap-2">
          <FaRegEdit />
        </IconBtn>
      </div>

      {/* section 2 */}
      <div className='bg-richblack-800 border-2 border-white px-10 py-7 mt-8'>
          <div className='flex justify-between items-center mb-3'>
            <p className='font-bold text-[1.5rem]'>About</p>
            <IconBtn 
            text="Edit"
            onClick={() => navigate("/Dashboard/Settings")}
            customClasses={"flex justify-center items-center gap-2"}>
              <FaRegEdit />
            </IconBtn>
          </div>
          <p>{user?.addtionalDetails?.about ?? "Write Something about Yourself"}</p>
      </div>

      {/* section 3 */}
      <div className='bg-richblack-800 border-2 border-white px-10 py-7 mt-8'>
        <div>
          <div className='flex justify-between items-center mb-6'>
            <p className='font-bold text-[1.5rem]'>Personal Details</p>
            <IconBtn 
            text="Edit"
            onClick={() => navigate("/Dashboard/Settings")}
            customClasses={"flex justify-center items-center gap-2"}>
              <FaRegEdit />
            </IconBtn>
          </div>
          <div className='flex gap-10'>
            <div className='flex flex-col gap-5'>
              <div>
                <p className='font-bold'>First Name</p>
                <p>{user?.firstName}</p>
              </div>
              <div>
                <p className='font-bold'>Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className='font-bold'>Gender</p>
                <p>{user?.addtionalDetails?.gender ?? "Add Gender"}</p>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div>
                <p className='font-bold'>Last Name</p>
                <p>{user?.lastName}</p>
              </div>
              <div>
                <p className='font-bold'>Phone Number</p>
                <p>{user?.addtionalDetails?.contactNumber ?? "Add Contact Number"}</p>
              </div>
              <div>
                <p className='font-bold'>Date of Birth</p>
                <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
