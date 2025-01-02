import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../../services/operation/authAPI';

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}  = useSelector((state) => state.profile)

  useEffect(() => console.log("user---", user), [user])
  return (
    <div className='relative group p-2'>
      <img src={user?.image} alt="User Profile Photo" 
      className='aspect-square w-[2rem] rounded-full object-cover' />
      <div className='bg-richblack-5 h-4 w-4 rounded-sm z-10 rotate-45 mt-2 translate-x-1 absolute border-2 border-white invisible transition-all duration-200 group-hover:visible'></div>
      <div className='bg-richblack-5 border-2 border-white rounded-sm z-10 transition-all duration-200 mt-4 px-1 absolute invisible group-hover:visible'> 
        <div className='flex flex-col'>
          <Link to={'/Dashboard/My-Profile'} className='py-2 px-4 border-b-2'>Dashboard</Link>
          <Link to={'#'} className='py-2 px-4 flex items-center gap-2' onClick={() => {dispatch(logout(navigate))}}>
            <p>Logout</p>
            <VscSignOut/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown
