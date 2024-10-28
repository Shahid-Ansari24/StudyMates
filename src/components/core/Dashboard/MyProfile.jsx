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
      <h1>
        My Profile
      </h1>

      {/* section 1 */}
      <div>
        <div>
          <img src={user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[70px] rounded-full object-cover' />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <IconBtn 
          text="Edit"
          onClick={() => {
            navigate("Dashboard/Settings")
          }}>
            <FaRegEdit />
          </IconBtn>
      </div>

      {/* section 2 */}
      <div>
          <div>
            <p>About</p>
            <IconBtn 
            text="Edit"
            onClick={navigate("/Dashboard/Setting")}>
              <FaRegEdit />
            </IconBtn>
          </div>
          <p>{user?.addtionalDetails?.about ?? "Write Something about Yourself"}</p>
      </div>

      {/* section 3 */}
      <div>
        <div>
          <div>
            <p>Personal Details</p>
            <IconBtn 
            text="Edit"
            onClick={navigate("/Dashboard/Setting")}>
              <FaRegEdit />
            </IconBtn>
          </div>
          <div>
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>{user?.addtionalDetails?.gender ?? "Add Gender"}</p>
          </div>
          <div>
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>{user?.addtionalDetails?.contactNumber ?? "Add Contact Number"}</p>
          </div>
          <div>
            <p>Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
